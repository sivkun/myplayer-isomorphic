import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import progressBar from '../components/progressBar'
import actions from '../../common/actions'

const mapStateToProps=(state)=>({
    mInfo:state.musicList.curMusic,
    audioD:state.audioD
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actions,dispatch)
})

const progressBarCtnr = connect(
    mapStateToProps,
    mapDispatchToProps
)(progressBar);
export default progressBarCtnr;

//已经弃用
