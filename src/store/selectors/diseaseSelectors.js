import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectDiseasesState = (state) => state.diseases;
export const selectAllDiseases = (state) => selectDiseasesState(state).diseases;
export const selectDiseasesLoading = (state) =>
  selectDiseasesState(state).loading;
export const selectDiseasesError = (state) => selectDiseasesState(state).error;
export const selectSelectedDisease = (state) =>
  selectDiseasesState(state).selectedDisease;

// selectDiseasesPagination

export const selectDiseasesPagination = (state) => ({
  currentPage: selectDiseasesState(state).currentPage,
  totalPages: selectDiseasesState(state).totalPages,
  hasMore: selectDiseasesState(state).hasMore,
  loadingMore: selectDiseasesState(state).loadingMore,
});

// // Memoized selectors
// export const selectDiseaseCategories = createSelector(
//   [selectAllDiseases],
//   (diseases) => {
//     if (!diseases || diseases.length === 0) return ["All Categories"];

//     return [
//       "All Categories",
//       ...Array.from(
//         new Set(diseases.map((disease) => disease.diseasesCategoryName))
//       ).filter(Boolean),
//     ];
//   }
// );

// export const selectFilteredDiseases = createSelector(
//   [
//     selectAllDiseases,
//     (state, searchQuery) => searchQuery,
//     (state, _, selectedCategory) => selectedCategory,
//   ],
//   (diseases, searchQuery, selectedCategory) => {
//     if (!diseases || diseases.length === 0) return [];

//     let filtered = [...diseases];

//     // Filter by search query
//     if (searchQuery && searchQuery.trim() !== "") {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (disease) =>
//           (disease.name && disease.name.toLowerCase().includes(query)) ||
//           (disease.description &&
//             disease.description.toLowerCase().includes(query)) ||
//           (disease.symptoms && disease.symptoms.toLowerCase().includes(query))
//       );
//     }

//     // Filter by category
//     if (selectedCategory && selectedCategory !== "All Categories") {
//       filtered = filtered.filter(
//         (disease) => disease.diseasesCategoryName === selectedCategory
//       );
//     }

//     return filtered;
//   }
// );

// // Get disease by ID
// export const makeSelectDiseaseById = () =>
//   createSelector(
//     [selectAllDiseases, (_, diseaseId) => diseaseId],
//     (diseases, diseaseId) =>
//       diseases.find((disease) => disease._id === diseaseId)
//   );

// // Get diseases by category
// export const selectDiseasesByCategory = createSelector(
//   [selectAllDiseases, (_, category) => category],
//   (diseases, category) => {
//     if (category === "All Categories") return diseases;
//     return diseases.filter(
//       (disease) => disease.diseasesCategoryName === category
//     );
//   }
// );

// // Get recent diseases (last 5)
// export const selectRecentDiseases = createSelector(
//   [selectAllDiseases],
//   (diseases) => {
//     return [...diseases]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 5);
//   }
// );

// // Get diseases with treatments
// export const selectDiseasesWithTreatments = createSelector(
//   [selectAllDiseases],
//   (diseases) => {
//     return diseases.filter(
//       (disease) => disease.treatments && disease.treatments.length > 0
//     );
//   }
// );
