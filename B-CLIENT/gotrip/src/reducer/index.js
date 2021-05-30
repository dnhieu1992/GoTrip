const initialState = {
    videos: [],
    videoSelected: null
  }
  const stateProducer = (state = initialState, action) => {
      return state;
    if (action.type === 'GET_VIDEOS') {
        return  Object.assign({}, state, {
            videos: action.payload.videos,
            videoSelected:action.payload.videoSelected
          })
      }
      if(action.type==='UPDATE_SELECTED_VIDEOS'){
        return  Object.assign({}, state, {
          videoSelected:action.payload.videoSelected
        })
      }
    return state
  }

  export default stateProducer;