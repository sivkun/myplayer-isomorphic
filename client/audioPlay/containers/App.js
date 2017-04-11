import React from 'react'
import ReactDOM from 'react-dom'
// import {connect} from 'react-redux'
import ProgressBarCtnr from './ProgressBarCtnr'
import VolumeCtnr from './VolumeCtnr'
import Style from '../scss/app'
import PlayListCtnr from './PlayListCtnr'
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
                    <VolumeCtnr />
                    <PlayListCtnr />
                </div>
            </div>
        );
    }
}
export default AudioPlay;
