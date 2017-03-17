import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import AudioWidget from '../components/AudioWidget';
import actions from '../../common/actions'
const mapStateToProps = (state) => ({
    musicList:state.musicList,
    control:state.control
})

const mapDispatchToProps = (dispatch) =>({
      actions:bindActionCreators(actions,dispatch)
})

const AudioWidgetCtnr = connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioWidget);

export default AudioWidgetCtnr;
