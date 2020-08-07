import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        errMess: null,
        comments: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errmess: null, comments: action.payload }

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] }

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};
        
        default:
            return state;
    }
}

//comment will be first added on the server and when we recieve a success that the
// comment has been added to the server only then we will add the comment to our redux store