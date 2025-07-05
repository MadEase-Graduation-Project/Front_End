// handle pending state

export const pendingHandler = ({
  loadingKey = "loading",
  errorKey = "error",
} = {}) => {
  return (state) => {
    state[loadingKey] = true;
    state[errorKey] = false;
  };
};

// handle fulfilled state

export const fulfilledHandler = ({
  loadingKey = "loading",
  errorKey = "error",
  detailsKey = null,
} = {}) => {
  return (state, action) => {
    state[loadingKey] = false;
    state[errorKey] = false;
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
  return (state) => {
    state[loadingKey] = false;
    state[errorKey] = true;
  };
};
