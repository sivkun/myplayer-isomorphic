import React from 'react';
import ReactDOM from 'react-dom';
// import drag from './Drag';
import Style from '../scss/progressBar.scss'
import utils from '../../shared/utils'

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { resize: true }
        this.barbgDWidth;
    }
    componentDidMount() {
        let barbgD = ReactDOM.findDOMNode(this.refs.barbg);
        this.barbgDWidth = barbgD.offsetWidth;
        window.addEventListener('resize', () => {
            this.setState({
                resize: !this.state.resize
            }
            );
        });
    }
    componentDidUpdate() {
        this.barbgDWidth = ReactDOM.findDOMNode(this.refs.barbg).offsetWidth;
    }
    curClickHandler(event) {
        let barbgD = ReactDOM.findDOMNode(this.refs.barbg);
        event.preventDefault();
        event.stopPropagation();
        this.props.curClickHandler(this.props.mInfo.totalTime * event.nativeEvent.offsetX / barbgD.offsetWidth);

    }

    render() {
        let mInfo = this.props.mInfo;
        const timeFormat = utils.timeFormat;
        const { curTime, totalTime } = mInfo;
        let curDotLeft, curWidth;
        if (this.barbgDWidth != null) {
            curWidth = curTime / totalTime * (this.barbgDWidth - 10);
            curDotLeft = curWidth - 5
        } else {
            curWidth = 0;
            curDotLeft = -5;
        }
        return (

            <div className={Style.progressBar}>
                <div className={Style.progressBarTop}>
                    <span className={Style.songName}>{mInfo.song}</span>
                    <span className={Style.singerName}> - {mInfo.artist}</span>
                    <span className={Style.time} ref='time'><em id='curTime'>{timeFormat(curTime)}</em> / {timeFormat(totalTime)}</span>
                </div>
                <div className={Style.barView} onClick={this.curClickHandler.bind(this)} >
                    <div className={Style.barbg} ref='barbg' >
                        <div className={Style.rdy} ></div>
                        <div className={Style.cur} style={{ width: curWidth }} ref='cur'>
                            <span className='' style={{ left: curDotLeft }} ref='curDot' ></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
