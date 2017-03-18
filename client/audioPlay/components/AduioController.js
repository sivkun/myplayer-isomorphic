import React from 'react'
import ReactDOM from 'react-dom'
import Style from '../scss/AduioController.scss'
export default class AduioController extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let playClass='iconfont '+(this.props.status=='pause'?'icon-bofang':'icon-pause1')+' '+ Style.playIycon;
        return (
            <div ref='aduioControll' className={Style.controller}>
                <span id='pprev' className='iconfont icon-pprev' onClick={()=>this.props.audioPlayPrevOrNext(-1)}></span>
                <span id='play' className={playClass} onClick={()=>{this.props.switchPlay()}}></span>
                <span id='pnext' className='iconfont icon-pnext' onClick={()=>this.props.audioPlayPrevOrNext(1)}></span>
            </div>
        );
    }
}
