import RegisterScreen from "../components/RegisterScreen";
import {connect} from 'react-redux'
import {userRegister} from '../services/actions/Action'


const mapStateToProps = state =>({
    userData:state.registerUser.userData
})

const mapDispatchToProps = dispatch => ({
    registerUserHandler:data=>dispatch(userRegister(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(RegisterScreen)
// export default RegisterScreen

// export default RegisterScreen;