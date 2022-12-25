import LoginScreen from "../components/LoginScreen";
import {connect} from 'react-redux'
import { userLogin } from "../services/actions/Action";


const mapStateToProps = state =>({
    userData:state.registerUser.userData
})

const mapDispatchToProps = dispatch => ({
    userLoginHandler:data=>dispatch(userLogin(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)
// export default HomeScreen;

// export default LoginScreen;