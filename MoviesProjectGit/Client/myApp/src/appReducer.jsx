export default function appReducer(state = { token: "" }, action) {
  switch (action.type) {
    case "START":
      return action.payload;

    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };
    case "ADD_MEMBER":
      return { ...state, members: [...state.members, action.payload] };
    case "ADD_SUB":
      return { ...state, subs: [...state.subs, action.payload] };

    case "UPDATE_MOVIE":
      let movies = state.movies;
      let index = state.movies.findIndex(
        (item) => item._id === action.payload._id
      );
      movies[index] = action.payload;
      return { ...state, movies: movies };

    case "UPDATE_MEMBER":
      let members = state.members;
      let indexMem = state.members.findIndex(
        (item) => item._id === action.payload._id
      );
      members[indexMem] = action.payload;
      return { ...state, members: members };

    case "DELETE_MOVIE":
      const copyMovies = state.movies.filter(
        (item) => item._id !== action.payload.movie._id
      );
      const copySubsMovie = state.subs.filter(
        (sub) => !action.payload.subs.some((s) => s._id === sub._id)
      );
      return { ...state, movies: copyMovies, subs: copySubsMovie };

    case "DELETE_MEMBER":
      const copyMembers = state.members.filter(
        (item) => item._id !== action.payload.member._id
      );
      const copySubsMember = state.subs.filter(
        (sub) => !action.payload.subs.some((s) => s._id === sub._id)
      );
      return { ...state, members: copyMembers, subs: copySubsMember };

    default:
      return state;
  }
}
