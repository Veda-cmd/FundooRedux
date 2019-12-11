const postReducer = (state = false, action) => {
  switch(action.type) {
    case 'SEARCH':
      return action.value;
    case 'DRAWER':
      return action.value;
    default:
      return state;
  }
}
export default postReducer;