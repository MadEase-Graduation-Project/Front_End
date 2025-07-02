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
    selectAllAdvices,
    (state, searchQuery) => searchQuery,
    (state, _, selectedCategory) => selectedCategory,
  ],
  (advices, searchQuery, selectedCategory) => {
    if (!advices || advices.length === 0) return [];

    let filtered = [...advices];

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (advice) =>
          (advice.title && advice.title.toLowerCase().includes(query)) ||
          (advice.description &&
            advice.description.toLowerCase().includes(query)) ||
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

// // Get advices by doctor ID
// export const selectAdvicesByDoctorId = createSelector(
//   [selectAllAdvices, (_, doctorId) => doctorId],
//   (advices, doctorId) =>
//     advices.filter((advice) => advice.doctorId === doctorId)
// );

// // Get advices by disease category
// export const selectAdvicesByCategory = createSelector(
//   [selectAllAdvices, (_, category) => category],
//   (advices, category) => {
//     if (category === "All Categories") return advices;
//     return advices.filter((advice) => advice.diseasesCategoryName === category);
//   }
// );

// // Get recent advices (last 5)
// export const selectRecentAdvices = createSelector(
//   [selectAllAdvices],
//   (advices) => {
//     return [...advices]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 5);
//   }
// );
