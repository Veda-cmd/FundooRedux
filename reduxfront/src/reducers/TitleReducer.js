const initialState={
  title:null,
  list:false
}

export const titleReducer=(state = initialState, action)=>{
    switch(action.type) {
      case 'TITLE':
        return {title:action.value};
      default:
        return state;
    }
}

export const listReducer=(state = initialState, action)=>{
  switch(action.type) {
    case 'LIST':
      return {list:action.value};
    default:
      return state;
  }
}

