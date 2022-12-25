import UserProfile from "../components/UserProfile";
import {connect} from 'react-redux'
import { userProfileData } from "../services/actions/Action";

const mapStateToProps = state =>({
    userData:state.registerUser.userData,
    userData:state.loginUser.userData,
    userData:state.userRegisteredId.userData
})

const mapDispatchToProps = dispatch => ({
    // forgotUserEmailHandler:data=>dispatch(userEmail(data))
    userProfileDataHandler:data=>dispatch(userProfileData(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)
// export default HomeScreen;

// export default LoginScreen;

// export default UserProfile;