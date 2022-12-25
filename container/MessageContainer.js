import Message from "../components/Message";
import {connect} from 'react-redux'
import {userMessage} from '../services/actions/Action'

const mapStateToProps = state =>({
    userData:state.userMesg.userData,
    userData:state.loginUser.userData
})

const mapDispatchToProps = dispatch => ({
    // UserMessageHandler:data=>dispatch(userMessage(data))
})


export default connect(mapStateToProps,mapDispatchToProps)(Message)
// export default Message;