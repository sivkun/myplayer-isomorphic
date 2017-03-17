// require('normalize.css/normalize.css');
require('../sass/global.css')
require('../../shared/fonts/icons/iconfont.css')
import React from 'react'
import ReactDOM from 'react-dom'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'
// import actions from '../actions'
import Style from '../sass/common'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Bottom from '../components/Bottom'
class Common extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return (
            <div className={Style.app}>
                <Header />
                <div className='clearfix'>
                    <Sidebar />
                    <div className='container-content'>
                    </div>
                </div>
                <Bottom />
            </div>
        )
    }
}
// function mapStateToProps(state){
//     return state;
// }
// function mapDispatchToProps(dispatch){
//     return{
//         actions:bindActionCreators(actions,dispatch)
//     }
// }
// export default connect({
//    mapStateToProps,
//    mapDispatchToProps
// })(Common)
export default Common
