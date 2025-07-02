export const selectAdsState = (state) => state.ads;
export const selectAllAds = (state) => selectAdsState(state).ads;
export const selectAdsLoading = (state) => selectAdsState(state).loading;
export const selectAdsError = (state) => selectAdsState(state).error;
export const selectSelectedAd = (state) => selectAdsState(state).selectedAd;

// selectAdsPagination
export const selectAdsPagination = (state) => ({
  currentPage: selectAdsState(state).currentPage,
  totalPages: selectAdsState(state).totalPages,
  hasMore: selectAdsState(state).hasMore,
  loadingMore: selectAdsState(state).loadingMore,
});
