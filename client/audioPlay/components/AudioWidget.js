import React from 'react'
import ReactDOM from 'react-dom'
import AudioController from './AduioController'
import ProgressBar from './progressBar'
import Style from '../scss/audioWidget.scss'
class AudioWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            curTime: 0,
            dragTime: -1
        }
    }
    componentDidMount() {
        const { musicList } = this.props;
        this.audioD = new Audio(musicList.curMusic.url);
    }
    switchPlay() {
        const switchStatus = this.props.actions.switchStatus
        if (this.audioD.paused) {
            this.audioD.play();
            switchStatus('play');
            this.setTime();
        } else {
            clearInterval(this.intervalId);
            this.audioD.pause();
            switchStatus('pause');
        }
    }
    setTime() {
        const { setMusicCurTime, switchStatus } = this.props.actions

        this.intervalId = setInterval(() => {

            let audioD = this.audioD;
            this.setState({
                curTime: audioD.currentTime
            });
            if (this.audioD.ended) {
                this.setState({
                    curTime: 0
                });
                console.log(this.state)
                switchStatus('pause');
                clearInterval(this.intervalId);
                this.audioPlayPrevOrNext(1);
            }
        }, 1000);
    }
    audioPlayPrevOrNext(f) { //f=-1上一首，f=1下一首
        const { musicList, actions } = this.props;
        const playList = musicList.play;
        const mIndex = musicList.mIndex;
        const length = playList.length;
        const index = (length + mIndex + f) % length;
        actions.setCurMusicIndex(index);
        // this.audioD.pause();
        clearInterval(this.intervalId);
        // this.audioD = new Audio(playList[index].url); //该操作改在componentWillReceiveProps中操作。通过state中的musicList的mIndex进行控制。
        // this.switchPlay();
    }
    curClickHandler(time) {
        const { setMusicCurTime } = this.props.actions;
        const audioD = this.audioD;
        audioD.currentTime = time;
        // setMusicCurTime(audioD.currentTime);
        this.setState({
            curTime: audioD.currentTime
        });
        if (audioD.paused) {
            this.switchPlay();
        }
    }
    curDotDragHandler(ratio) {
        if (ratio === 'upHandler') {
            let dragTime = this.state.dragTime;
            if (dragTime !== -1) {
                this.audioD.currentTime = dragTime;
                this.setState({
                    curTime: dragTime,
                    dragTime: -1
                })
            }
            if (this.audioD.paused) {
                this.switchPlay();
            }
        } else {
            this.setState({
                dragTime: this.audioD.duration * ratio
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.musicList.mIndex !== this.props.musicList.mIndex) {
            const { musicList } = nextProps;
            clearInterval(this.intervalId);
            this.audioD.pause();
            this.audioD = new Audio(musicList.curMusic.url);
            this.switchPlay();
        }
    }
    render() {
        if (this.audioD) {
            this.audioD.volume = this.props.control.volume
        }
        if (this.props.musicList.mIndex) {

        }
        return (
            <div className={Style.audioWidget}>
                <AudioController
                    status={this.props.musicList.curMusic.status}
                    switchPlay={() => this.switchPlay()}
                    audioPlayPrevOrNext={(f) => this.audioPlayPrevOrNext(f)}
                />
                <ProgressBar
                    mInfo={this.props.musicList.curMusic}
                    curTime={this.state.curTime}
                    dragTime={this.state.dragTime}
                    curClickHandler={(t) => this.curClickHandler(t)}
                    curDotDragHandler={(r) => this.curDotDragHandler(r)}
                />
            </div>
        )
    }
}

export default AudioWidget;
