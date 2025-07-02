import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectAdvicesState = (state) => state.advices;
export const selectAllAdvices = (state) => selectAdvicesState(state).advices;
export const selectAdvicesLoading = (state) =>
  selectAdvicesState(state).loading;
export const selectAdvicesError = (state) => selectAdvicesState(state).error;
export const selectSelectedAdvice = (state) =>
  selectAdvicesState(state).selectedAdvice;
export const selectAdviceCount = (state) =>
  selectAdvicesState(state).totalAdvices;

// return advices sorted
export const sortedAdvices = createSelector([selectAllAdvices], (advices) => {
  if (!advices || advices.length === 0) return [];
  return [...advices].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
});

// Memoized selectors
export const selectAdviceCategories = createSelector(
  [selectAllAdvices],
  (advices) => {
    if (!advices || advices.length === 0) return ["All Categories"];

    return [
      "All Categories",
      ...Array.from(
        new Set(advices.map((advice) => advice.diseasesCategoryName))
      ).filter(Boolean),
    ];
  }
);

export const selectFilteredAdvices = createSelector(
  [
    sortedAdvices, // use sortedAdvices here instead of selectAllAdvices
    (state, searchQuery) => searchQuery,
    (state, _, selectedCategory) => selectedCategory,
  ],
  (advices, searchQuery, selectedCategory) => {
    if (!advices || advices.length === 0) return [];

    let filtered = advices;

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (advice) =>
          (advice.title && advice.title.toLowerCase().includes(query)) ||
          // (advice.description &&
          //   advice.description.toLowerCase().includes(query)) ||
          (advice.doctorName && advice.doctorName.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (advice) => advice.diseasesCategoryName === selectedCategory
      );
    }

    return filtered;
  }
);

// Pagination selector: returns a slice of sorted & filtered advices for the current page
export const selectPaginatedAdvices = createSelector(
  [
    selectFilteredAdvices,
    (state, _, __, page = 1) => page,
    (state, _, __, ___, pageSize = 9) => pageSize,
  ],
  (filteredAdvices, page, pageSize) => {
    // Return all advices up to the current page (accumulate)
    const end = page * pageSize;
    return filteredAdvices.slice(0, end);
  }
);

// // Get advices by doctor ID
// export const selectAdvicesByDoctorId = createSelector(
//   [selectAllAdvices, (_, doctorId) => doctorId],
//   (advices, doctorId) =>
//     advices.filter((advice) => advice.doctorId === doctorId)
// );
//     advices.filter((advice) => advice.doctorId === doctorId)
// );
