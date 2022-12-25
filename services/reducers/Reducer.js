import {REGISTER_USER, LOGIN_USER, User_Profile_Data, USER_MESSAGE, SELECTED_LIBRARY, USER_SELECTED_ID} from '../Constants'

const initialState = {
    userData:[]
}
export default function registerUser(state=initialState,action){
    switch(action.type){
        case REGISTER_USER : 
            console.log('reducer ',action)
            return {
                ...state,
                userData:action.data
            }
            break;

            default:
                return state
    }
} 

export function loginUser(state=initialState,action){
    switch(action.type){
        case LOGIN_USER:
            console.log('reducer message',action)
            return {
                ...state,
                userData:action.data
            }
            break;

            default:
                return state
    }
}

export function profileUserData(state=initialState,action){
    switch(action.type){
        case User_Profile_Data:
            console.log('reducer message',action)
            return {
                ...state,
                userData:action.data
            }
            break;

            default:
                return state
    }
}

export function userRegisteredId(state=initialState,action){
    switch(action.type){
        case USER_SELECTED_ID:
            console.log('reducer message',action)
            return {
                ...state,
                userData:action.data
            }
            break;

            default:
                return state
    }
}



export function userMesg(state=initialState,action){
    switch(action.type){
        case USER_MESSAGE:
            console.log('reducer message',action)
            return {
                ...state,
                userData:action.data
            }
            break;

            default:
                return state
    }
}

export function selectedLibraryName(state=initialState,action){
    switch(action.type){
        case SELECTED_LIBRARY:
            console.log('Selected Library', action)
            return {
                ...state,
                userData:action.data
            }
            break;

            default:
                return state
    }
}