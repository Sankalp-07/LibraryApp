import SeatBookingScreen from "../components/SeatBookingScreen";
import {connect} from 'react-redux'
import {userMessage} from '../services/actions/Action'

const mapStateToProps = state =>({
    userData:state.userMesg.userData,
    // userData:state.selectedLibraryName.userData
    userData:state.registerUser.userData,
    userData:state.loginUser.userData

})

const mapDispatchToProps = dispatch => ({
    UserMessageHandler:data=>dispatch(userMessage(data))
})


export default connect(mapStateToProps,mapDispatchToProps)(SeatBookingScreen)
// export default SeatBookingScreen;