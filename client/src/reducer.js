export default (state, action) => {
  switch (action.type) {
    case "IS_AUTH":
      return {
        ...state,
        isAuth: action.payload.bool,
        roomId: action.payload.roomId,
        userName: action.payload.userName,
      };
    case "ROOM:JOINED":
      return {
        ...state,
        users: action.payload,
      };
    case "DELETED_MESSAGE":
      return { ...state, messages: [...action.payload] };
    case "NEW_MESSAGE":
      console.log(...action.payload);
      return { ...state, messages: [...state.messages, ...action.payload] };
    case "CONNECTION":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
