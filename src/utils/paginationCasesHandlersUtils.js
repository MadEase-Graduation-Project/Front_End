// handle pagination loading

export const pendingPaginationHandler = (
  pageParam = "page",
  firstPage = 1,
  loadingKey = "loading",
  loadingMoreKey = "loadingMore",
  errorKey = "error"
) => {
  return (state, action) => {
    const requestedPage = action.meta?.arg?.[pageParam] ?? firstPage;

    if (requestedPage === firstPage) {
      state[loadingKey] = true;
    } else {
      state[loadingMoreKey] = true;
    }

    state[errorKey] = false;
  };
};

// handle fulfilled pagination

export const fulfilledPaginationHandler = ({
  listKey = "list",
  loadingKey = "loading",
  loadingMoreKey = "loadingMore",
  errorKey = "error",
  totalsMap = {
    totalPages: "totalPages",
    currentPage: "currentPage",
    totalItems: "totalItems",
  },
  pageArgKey = "page",
} = {}) => {
  return (state, action) => {
    const {
      data = [],
      [totalsMap.totalItems]: totalItems = 0,
      [totalsMap.totalPages]: totalPages = 1,
      [totalsMap.currentPage]: currentPage = 1,
    } = action.payload || {};

    const requestedPage = action.meta?.arg?.[pageArgKey] ?? 1;

    if (requestedPage === 1) {
      state[listKey] = data;
      state[loadingKey] = false;
    } else {
      state[listKey].push(...data);
      state[loadingMoreKey] = false;
    }

    state[totalsMap.totalItems] = totalItems;
    state[totalsMap.totalPages] = totalPages;
    state[totalsMap.currentPage] = currentPage;
    state.hasMore = currentPage < totalPages;
    state[errorKey] = false;
  };
};

// handle rejected pagination

export const rejectedPaginationHandler = ({
  loadingKey = "loading",
  loadingMoreKey = "loadingMore",
  errorKey = "error",
} = {}) => {
  return (state) => {
    state[loadingKey] = false;
    state[loadingMoreKey] = false;
    state[errorKey] = true;
  };
};
