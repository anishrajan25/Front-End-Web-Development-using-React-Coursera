import * as ActionTypes from './ActionTypes';


export const Dishes = (state = {
        isLoading: true,
        errMess: null,
        dishes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errmess: null, dishes: action.payload }

        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMess: null, dishes: [] }

        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, dishes: [] }

        default:
            return state;
    }
}


// { ...state, } here we take the state and everything after ',' will be
// applied to states. It will not be mutated. copy with updates will be returned
