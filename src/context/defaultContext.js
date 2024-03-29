const auth = {
  isLogin: false,
  userDetails: {},
  screens: {},
  token: null,
  userid: "",
};

const defaultContext = {
  auth: auth,
  setAuth: () => {},
  error: {
    title: "No Title",
    message: "No Error",
  },
  setError: () => {},
  loading: false,
  setLoading: () => {},
};

export default defaultContext;
