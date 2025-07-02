// handle pending state

export const pendingHandler = ({
  loadingKey = "loading",
  errorKey = "error",
} = {}) => {
  return (state) => {
    state[loadingKey] = true;
    state[errorKey] = null;
  };
};

// handle fulfilled state

export const fulfilledHandler = ({
  loadingKey = "loading",
  detailsKey = null,
} = {}) => {
  return (state, action) => {
    state[loadingKey] = false;
    if (detailsKey) {
      state[detailsKey] = action.payload?.data;
    }
  };
};

// handle rejected state

export const rejectedHandler = ({
  loadingKey = "loading",
  errorKey = "error",
} = {}) => {
  return (state, action) => {
    state[loadingKey] = false;
    state[errorKey] = action.error?.message ?? "unexpected error";
  };
};
