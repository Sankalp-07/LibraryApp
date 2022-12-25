import {combineReducers} from 'redux'
import registerUser from './Reducer'
import loginUser from './Reducer'
import userMesg from './Reducer'
import selectedLibraryName from './Reducer'
import profileUserData from './Reducer'
import userRegisteredId from './Reducer'
export default combineReducers({
    registerUser,
    loginUser,
    profileUserData,
    userRegisteredId,
    userMesg,
    selectedLibraryName
})