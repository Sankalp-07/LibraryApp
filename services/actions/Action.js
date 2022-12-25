import {REGISTER_USER, LOGIN_USER, User_Profile_Data, USER_MESSAGE, SELECTED_LIBRARY, USER_SELECTED_ID} from '../Constants'
export const userRegister = (data) => {
    console.log('Action ', data)
    return {
        type:REGISTER_USER,
        data:data,
    }
}

export const userLogin = (data) => {
    console.log('Action ', data)
    return {
        type:LOGIN_USER,
        data:data,
    }
}

export const userProfileData = (data) => {
    console.log('User Profile Data', data)
    return{
        type:User_Profile_Data,
        data:data
    }
}

export const userSelectedId = (data) => {
    console.log('User Selected Id', data)
    return{
        type:USER_SELECTED_ID,
        data:data
    }
}



// export const userMessage = (data) => {
//     console.log('userMessage ', data)
//     return{
//         type:LOGIN_USER,
//         data:data,
//     }
// }



export const userMessage = (data) => {
    console.log('userMessage ', data)
    return{
        type:USER_MESSAGE,
        data:data,
    }
}

export const userSelectedLibrary = (data) => {
    console.log('userSelectedLibrary', data)
    return{
        type:SELECTED_LIBRARY,
        data:data
    }
}