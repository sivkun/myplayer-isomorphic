import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Volume from '../components/Volume'
import actions from '../../common/actions'
const mapStateToProps=(state)=>({
    volume:state.control.volume
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actions,dispatch)
})


const VolumeCtnr = connect(
 mapStateToProps,
 mapDispatchToProps
)(Volume);

export default VolumeCtnr;
