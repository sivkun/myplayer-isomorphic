import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import AudioController from '../components/AduioController';
import actions from '../../common/actions'
const mapStateToProps = (state) => ({
    playList:state.musicList.play,
    curMusic:state.musicList.curMusic,
    mIndex:state.musicList.mIndex,
    control:state.control
})
const mapDispatchToProps = (dispatch) =>({
      actions:bindActionCreators(actions,dispatch)
})

const AudioControllerCtnr = connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioController);

export default AudioControllerCtnr;
//已经弃用
