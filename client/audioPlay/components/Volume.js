import React from 'react'
import ReactDOM from 'react-dom'
// import drag from './Drag'
import Style from '../scss/Volume.scss'
export default class Volume extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.barBg = ReactDOM.findDOMNode(this.refs.barbg);
        this.props.actions.setVolume(0.4);
        document.addEventListener('click', (e) => {
            // console.log(e.target.className)
            if(e.target.className.indexOf('volume')!==-1)return;
            ReactDOM.findDOMNode(this.refs.vcShow).className = Style.controll + ' ' + Style.hidden;
        });
        ReactDOM.findDOMNode(this.refs.volume).addEventListener('click', (e) => {
            this.showVolClickHandler(e);
        });
        ReactDOM.findDOMNode(this.refs.vcShow).addEventListener('click', (e) => {
            e.stopPropagation();
        })
    }
    showVolClickHandler(e) {
        let vcShow = ReactDOM.findDOMNode(this.refs.vcShow);
        if (vcShow.className === Style.controll + ' ' + Style.hidden) {
            vcShow.className = Style.controll;
        } else {
            vcShow.className = Style.controll + ' ' + Style.hidden;
        }
      //  e.stopPropagation();
    }

    volCurClickHandler(e) {
        if (e.target.className !== Style.curDot) {
            let barBgWidth = this.barBg.clientWidth;
            let offsetX = e.nativeEvent.offsetX;
            if (offsetX < 0) {
                offsetX = 0
            }
            // console.log(offsetX)
            this.props.actions.setVolume(offsetX / (barBgWidth));
        }
        e.stopPropagation();
    }
    volDragHandler(e) {
        const setVolume = this.props.actions.setVolume;
        const barBgWidth = this.barBg.clientWidth;
        const target = e.target;
        const startX = e.clientX;
        const deltaX = startX - target.offsetLeft;
        let curDot = ReactDOM.findDOMNode(this.refs.curDot);
        document.addEventListener('mousemove', mousemoveHandler, true);
        document.addEventListener('mouseup', mouseupHandler, true)
        function mousemoveHandler(e) {

            let left = e.clientX - deltaX + 10;// 加10为了修正curDot的偏移，以dot的中心为基准。
            if (left < 0) {
                left = 0
            }
            if (left > barBgWidth) {
                left = barBgWidth
            }
            // console.log(left)
            setVolume((left) / (barBgWidth))
            e.stopPropagation();
        }
        function mouseupHandler(e) {
            document.removeEventListener('mousemove', mousemoveHandler, true)
            document.removeEventListener('mouseup', mouseupHandler, true)
            e.stopPropagation();
        }
    }
    render() {
        var barBgLeft = -5;
        if (this.barBg) {
            var barBgWidth = this.barBg.clientWidth;
            barBgLeft = (barBgWidth) * this.props.volume - 10;
        }

        return (
            <div ref='volume' className={Style.volume} >
                <div className={Style.controll + ' ' + Style.hidden} ref='vcShow' >
                    <div className={Style.vcArrow}>
                        <em></em>
                        <i></i>
                    </div>

                    <span className={'iconfont icon-volume2 ' + Style.vcIcon}></span>

                    <div className={Style.vcBarView} ref='vcbarView' onMouseDown={(e) => { this.volCurClickHandler(e) }} >
                        <div className={Style.barBg} ref='barbg'>
                            <div className={Style.cur} ref='cur' style={{ width: (barBgLeft + 10) }} >
                                <span className={Style.curDot} style={{ left: barBgLeft }} ref='curDot' onMouseDown={(e) => { this.volDragHandler(e) }} ></span>
                            </div>
                        </div>
                    </div>

                </div>

                <span className='iconfont icon-volume2' ></span>
            </div>
        )
    }
}

