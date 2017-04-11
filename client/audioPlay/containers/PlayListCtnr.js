import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {PlayList} from '../components/PlayList'
import actions from '../../common/actions'

const mapStateToProps = (state)=>({
    musicList:state.musicList
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actions,dispatch)
})

const PlayListCtnr = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayList);

export default PlayListCtnr;
