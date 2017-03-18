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
        // console.log(event.nativeEvent.offsetX,event.target.nodeName)
        // if(event.target.nodeName!=='SPAN')
        this.props.curClickHandler(this.props.mInfo.totalTime * event.nativeEvent.offsetX / barbgD.offsetWidth);
    }
    curDotDragHandler(e) {
        //[-5,this.barbgDWidth-15]
        const props = this.props;
        const barbgDWidth = this.barbgDWidth - 10;
        const ele = e.target;
        const startX = e.clientX;
        const deltaX = startX - ele.offsetLeft;
        document.addEventListener('mousemove', moveHandler, true);
        document.addEventListener('mouseup', upHandler, true);
        e.stopPropagation();
        e.preventDefault();
        function moveHandler(e) {
            let left = e.clientX - deltaX;
            if (left < -5) {
                left = -5
            }
            if (left > barbgDWidth) {
                left = barbgDWidth
            }
            props.curDotDragHandler((left + 5) / barbgDWidth);
            e.stopPropagation();
            e.preventDefault();
        }
        function upHandler(e) {
            document.removeEventListener('mouseup', upHandler, true);
            document.removeEventListener('mousemove', moveHandler, true);
            props.curDotDragHandler('upHandler');
            e.stopPropagation();
            e.preventDefault();
        }
    }

    render() {
        let mInfo = this.props.mInfo;
        const timeFormat = utils.timeFormat;
        const { totalTime } = mInfo;
        let curTime = this.props.curTime;
        if (this.props.dragTime !== -1) {
            curTime = this.props.dragTime;
        }
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
                            <span className='' style={{ left: curDotLeft }} ref='curDot'
                            onMouseDown={(e) =>{this.curDotDragHandler(e)}}
                            onClick={(e)=>{e.stopPropagation()}} ></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
