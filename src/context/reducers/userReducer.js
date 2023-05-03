const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return state;

    case "GET_USER":
      return action.user;

    default:
      return state;
  }
};

export default userReducer;
