const initialUserState = {
  userData: 4,
  recommendedSongs: [],
};

export const spotifyReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "LOG_IN":
      console.log("Log in reducer reached:");
      return {
        state,
      };

    case "FETCH_USER":
      console.log("Fetch user reducer reached:", action.payload);
      return {
        ...state,
        userData: action.payload[0].userid,
      };

    case "STORE_PREDICTIONS":
      console.log("Store predictions reducer reached:", action.payload);
      return {
        ...state,
        recommendedSongs: [...state.recommendedSongs, action.payload],
      };

    default:
      return state;
  }
};
