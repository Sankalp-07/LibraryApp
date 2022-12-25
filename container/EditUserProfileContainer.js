import EditUserProfileScreen from "../components/EditUserProfileScreen";
import {connect} from 'react-redux'
// import {userRegister} from '../services/actions/Action'


const mapStateToProps = state =>({
    // userData:state.profileUserData.userData,
    userData:state.userRegisteredId.userData
})

const mapDispatchToProps = dispatch => ({
    // registerUserHandler:data=>dispatch(userRegister(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditUserProfileScreen)

// export default EditUserProfileScreen;