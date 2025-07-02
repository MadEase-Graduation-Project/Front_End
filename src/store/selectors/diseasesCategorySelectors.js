export const selectDiseasesCategoryState = (state) => state.diseasesCategories;
export const selectAllDiseasesCategories = (state) =>
  selectDiseasesCategoryState(state).categories;
export const selectDiseasesCategoriesLoading = (state) =>
  selectDiseasesCategoryState(state).loading;
export const selectDiseasesCategoriesError = (state) =>
  selectDiseasesCategoryState(state).error;
export const selectSelectedDiseaseCategory = (state) =>
  selectDiseasesCategoryState(state).selectedDiseaseCategory;

// selectDiseasesCategoriesPagination
export const selectDiseasesCategoriesPagination = (state) => ({
  currentPage: selectDiseasesCategoryState(state).currentPage,
  totalPages: selectDiseasesCategoryState(state).totalPages,
  hasMore: selectDiseasesCategoryState(state).hasMore,
  loadingMore: selectDiseasesCategoryState(state).loadingMore,
});
