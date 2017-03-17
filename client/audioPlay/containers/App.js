import React from 'react'
import ReactDOM from 'react-dom'
// import {connect} from 'react-redux'
import ProgressBarCtnr from './ProgressBarCtnr'
import Volume from '../components/Volume'
import Style from '../scss/app'
import { PlayList } from '../components/PlayList'
import AudioControllerCtnr from './AduioControllerCtnr'
import AudioWidgetCtnr from './AudioWidgetCtnr'
const AudioImg = () => {
    return (
        <div className={Style.audioImg}>
            <div className={Style.shadeLayer + " " + Style.show }>
            </div>
        </div>
    );
}

class AudioPlay extends React.Component {
    constructor(props) {
        super(props);
    }
    /**播放列表end */
    render() {
        return (
            <div className={Style.audioPlay} >
                <AudioImg />
                {/*<AudioControllerCtnr />
                <ProgressBarCtnr />*/}
                <AudioWidgetCtnr/>
                <div className={Style.audioPlayRight} >
                    <span className={"iconfont icon-xihuan1  " +Style.like}></span>
                    <span className={"iconfont icon-bofangliebiao1 "+Style.order}></span>
                    <Volume />
                    <PlayList />
                </div>
            </div>
        );
    }
}
export default AudioPlay;
