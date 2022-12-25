import HomeScreen from "../components/HomeScreen";
import {connect} from 'react-redux'
import {userSelectedLibrary} from '../services/actions/Action'
import {userSelectedId} from '../services/actions/Action'
const mapStateToProps = state =>({
    userData:state.selectedLibraryName.userData
})

const mapDispatchToProps = dispatch => ({
    userSelectedLibraryHandler:data=>dispatch(userSelectedLibrary(data)),
    userSelectedIdHandler:data=>dispatch(userSelectedId(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)
// export default HomeScreen;