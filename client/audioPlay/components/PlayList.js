import React from 'react'
import ReactDOM from 'react-dom'
import Scrollbars from 'react-custom-scrollbars'
import { timeFormat } from '../../shared/utils.js'
import Style from '../scss/playList.scss'
class PlayListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    itemMouseDownHandler(e) {
        let playListItem = ReactDOM.findDOMNode(this.refs.playListItem);
        playListItem.className = Style.playListItem + ' ' + Style.zoomf;
    }
    itemMouseUpHandler(e) {
        let playListItem = ReactDOM.findDOMNode(this.refs.playListItem);
        playListItem.style.transition = 'all .25s ease-in';
        playListItem.className = Style.playListItem;
        setTimeout(() => playListItem.style.transition = '', 300);
    }
    itemDbClickHandler(key) {
        this.props.playListMusicPlay(key);
    }
    render() {
        const item = this.props.item
        let statusStyle = {}, playingStyle = {};
        if (this.props.isPlay) {
            statusStyle = { color: '#BC2F2E', visibility: 'visible', opacity: '1' };
            playingStyle = { color: '#BC2F2E' }
        }
        return (
            <div tabIndex='0' className={Style.playListItem} ref='playListItem' onDoubleClick={() => { this.itemDbClickHandler(this.props.index) }} onMouseDown={(e) => { this.itemMouseDownHandler(e) }} onMouseUp={(e) => { this.itemMouseUpHandler(e) }} >
                <span style={statusStyle} className={'iconfont icon-right  ' + Style.status}></span>
                <div style={playingStyle} className={Style.songCon}>{item.song}</div>
                <span style={playingStyle} className={Style.artist}>{item.artist}</span>
                <span style={playingStyle} className={Style.time}>{timeFormat(item.totalTime)}</span>
                <span style={playingStyle} tabIndex='1' className={'iconfont icon-icon1 ' + Style.delete}></span>
            </div>
        );
    }
}
class PlayList extends React.Component {

    componentDidMount() {
        document.addEventListener('click', (e) => {

            e.stopPropagation();

            if(e.target.className.indexOf('playList')!==-1)return;
            let playListShow = ReactDOM.findDOMNode(this.refs.playListShow);

            playListShow.className = Style.playListShow + ' ' + Style.hidden;
        })
        ReactDOM.findDOMNode(this.refs.showList).addEventListener('click',(e)=>{
            this.showListClickHandler(e);
        })
    }
    showListClickHandler(e) {

        let playListShow = ReactDOM.findDOMNode(this.refs.playListShow);

        if (playListShow.className == Style.playListShow) {
            playListShow.className = Style.playListShow + ' ' + Style.hidden;
        } else {
            playListShow.className = Style.playListShow;
        }
    }

    render() {
        const playList = this.props.musicList.play;
        return (
            <div className={Style.playList} >
                <div className={Style.playListShow + ' ' + Style.hidden} ref="playListShow">{this.showList()}</div>
                <div className={Style.playListIcon} ref='showList' >
                    <span className='playList_ iconfont icon-bofangliebiao'></span>
                    <span className={Style.number}>{playList.length}</span>
                </div>
            </div>
        )
    }
    showList() {
        const playList = this.props.musicList.play;
        const curIndex = this.props.musicList.mIndex;
        const playListMusicPlay = this.props.actions.setCurMusicIndex;

        const playListItemArr = playList.map(function (value, index) {
            var isPlay = false;
            if (index == curIndex) {
                isPlay = true;
            }
            return <PlayListItem key={index} index={index} item={value} isPlay={isPlay} playListMusicPlay={playListMusicPlay} />
        });

        return (
            <div className={Style.playListShow} ref='playListShow' >
                <div className={Style.list}>
                    <div className={Style.listTop}>
                        <span className={Style.musicList} >播放列表</span>
                        <span className={Style.collection}><i className='iconfont icon-shoucang'></i>收藏全部</span>
                        <span className={Style.clearAll}><i className='iconfont icon-qingkong'></i>清空</span>
                        <span className={'iconfont icon-icon1 ' + Style.ltclose}></span>
                    </div>
                    <Scrollbars
                        universal
                        style={{ width: '50.3rem', height: '45.6rem' }}
                        autoHide
                        autoHideTimeout={2000}
                        autoHideDuration={500}
                        renderThumbHorizontal={props => <div {...props} />}
                        renderThumbVertical={props => <div {...props} className={Style['thumb-vertical']} />}
                        renderView={(props) => <div {...props} />}
                    >
                        <div className={Style.listContainer}>
                            {playListItemArr}
                        </div>
                    </Scrollbars>
                </div>
            </div>)
    }
}
const showList = (playList, curIndex, playListMusicPlay) => {
    const playListItemArr = playList.map(function (value, index) {
        var isPlay = false;
        if (index == curIndex) {
            isPlay = true;
        }
        return <PlayListItem key={index} index={index} item={value} isPlay={isPlay} playListMusicPlay={playListMusicPlay} />
    });

    return (
        <div className={Style.playListShow} ref='playListShow' >
            <div className={Style.list}>
                <div className={Style.listTop}>
                    <span className={Style.musicList} >播放列表</span>
                    <span className={Style.collection}><i className='iconfont icon-shoucang'></i>收藏全部</span>
                    <span className={Style.clearAll}><i className='iconfont icon-qingkong'></i>清空</span>
                    <span className={'iconfont icon-icon1 ' + Style.ltclose}></span>
                </div>
                <Scrollbars
                    universal
                    style={{ width: '50.3rem', height: '45.6rem' }}
                    autoHide
                    autoHideTimeout={2000}
                    autoHideDuration={500}
                    renderThumbHorizontal={props => <div {...props} />}
                    renderThumbVertical={props => <div {...props} className={Style['thumb-vertical']} />}
                    renderView={(props) => <div {...props} />}
                >
                    <div className={Style.listContainer}>
                        {playListItemArr}
                    </div>
                </Scrollbars>
            </div>
        </div>)
}


export { PlayList }
