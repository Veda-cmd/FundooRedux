const initialState={
  drawer:false,
  search:false,
  searchData:[],
  view:false,
  notes:[]
}

const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH':
      return {search:action.value};
    case 'DRAWER':
      return {
        drawer:action.value};
    case 'SEARCHDATA':
      return{
        search:action.show,
        searchData:action.value,
        view:action.search
      }
    default:
      return state;
  }
}

export default postReducer;