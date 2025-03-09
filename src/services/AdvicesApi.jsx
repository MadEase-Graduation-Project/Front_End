import api from "./axios";

// Constants
const BASE_ENDPOINT = "/advice";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// IndexedDB Cache Service
class IndexedDBCache {
  constructor(
    dbName = "apiCache",
    storeName = "advices",
    duration = CACHE_DURATION
  ) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.duration = duration;
    this.dbPromise = this.initDB();
  }

  // Initialize the database
  initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "key" });
        }
      };

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => {
        console.error("IndexedDB error:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async set(key, value) {
    try {
      const db = await this.dbPromise;
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);

      const item = {
        key,
        data: value,
        timestamp: Date.now(),
      };

      await store.put(item);
      return true;
    } catch (error) {
      console.error("Error storing in IndexedDB:", error);
      return false;
    }
  }

  async get(key) {
    try {
      const db = await this.dbPromise;
      const tx = db.transaction(this.storeName, "readonly");
      const store = tx.objectStore(this.storeName);
      const item = await store.get(key);

      if (!item) return null;

      // Check if expired
      if (this.isExpired(item.timestamp)) {
        await this.invalidateKey(key);
        return null;
      }

      console.log("Data retrieved from IndexedDB cache");
      return item.data;
    } catch (error) {
      console.error("Error retrieving from IndexedDB:", error);
      return null;
    }
  }

  isExpired(timestamp) {
    return Date.now() - timestamp > this.duration;
  }

  async invalidate() {
    try {
      const db = await this.dbPromise;
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      await store.clear();
      return true;
    } catch (error) {
      console.error("Error clearing IndexedDB store:", error);
      return false;
    }
  }

  async invalidateKey(key) {
    try {
      const db = await this.dbPromise;
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      await store.delete(key);
      return true;
    } catch (error) {
      console.error("Error deleting from IndexedDB:", error);
      return false;
    }
  }
}

const cache = new IndexedDBCache();

// API Response handler
const handleApiResponse = (response, errorMessage) => {
  if (!response.data?.data) {
    throw new Error(errorMessage);
  }
  return response.data.data;
};

// Error handler
const handleApiError = (error, context) => {
  console.error(`Error ${context}:`, error);
  throw error;
};

//* Public API Methods
export async function getAllAdvices() {
  try {
    // Check cache first
    const cachedData = await cache.get("all_advices");
    if (cachedData) {
      console.log("ana men el cache ................");
      return cachedData;
    }

    // If not in cache, fetch from API
    const response = await api.get(BASE_ENDPOINT);
    const data = handleApiResponse(response, "No data received from server");

    // Store in cache
    await cache.set("all_advices", data);
    return data;
  } catch (error) {
    handleApiError(error, "fetching advices");
  }
}

export async function showAdvice(id) {
  try {
    // Check specific advice cache
    const cachedAdvice = await cache.get(`advice_${id}`);
    if (cachedAdvice) return cachedAdvice;

    // Check all advices cache
    const cachedAllAdvices = await cache.get("all_advices");
    if (cachedAllAdvices) {
      const advice = cachedAllAdvices.find((a) => a._id === id);
      if (advice) {
        await cache.set(`advice_${id}`, advice);
        return advice;
      }
    }

    // Fetch from server
    const response = await api.get(`${BASE_ENDPOINT}/${id}`);
    const data = handleApiResponse(response, `Advice with id ${id} not found`);

    // Store in cache
    await cache.set(`advice_${id}`, data);
    return data;
  } catch (error) {
    handleApiError(error, `fetching advice ${id}`);
  }
}

//* Protected API Methods
const createAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export async function addAdvice(addedAdvice, token) {
  try {
    const response = await api.post(
      BASE_ENDPOINT,
      addedAdvice,
      createAuthHeader(token)
    );
    await cache.invalidate();
    return response.data;
  } catch (error) {
    handleApiError(error, "adding advice");
  }
}

export async function editAdvice(id, editedAdvice, token) {
  try {
    const response = await api.put(
      `${BASE_ENDPOINT}/${id}`,
      editedAdvice,
      createAuthHeader(token)
    );
    await cache.invalidateKey("all_advices");
    await cache.invalidateKey(`advice_${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `editing advice ${id}`);
  }
}

export async function deleteAdvice(id, token) {
  try {
    const response = await api.delete(
      `${BASE_ENDPOINT}/${id}`,
      createAuthHeader(token)
    );
    await cache.invalidateKey("all_advices");
    await cache.invalidateKey(`advice_${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `deleting advice ${id}`);
  }
}

export const clearAdviceCache = () => cache.invalidate();
