import React from 'react'
import ReactDOM from 'react-dom'
import Scrollbars from 'react-custom-scrollbars'
// import { timeFormat } from './utils'
import Style from '../scss/playList.scss'
class PlayListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div tabIndex='0'  className={Style.playListItem} ref='playListItem' >
                <span  className={'iconfont icon-right ' + Style.status}></span>
                <div  className={Style.songCon}>{}</div>
                <span  className={Style.artist}>{}</span>
                <span  className={Style.time}>{}</span>
                <span tabIndex='1'  className={'iconfont icon-icon1 ' + Style.delete}></span>
            </div>
        );
    }
}
class PlayList extends React.Component {

    render() {
        return (
            <div className={Style.playList} >
                {showList()}
                <div className={Style.playListIcon} >
                    <span className="iconfont icon-bofangliebiao"></span>
                    <span className={Style.number}></span>
                </div>
            </div>


        )
    }
}
function showList(){
    return(
<div className={Style.playListShow +' '+ Style.hidden}  ref="playListShow">
                    <div className={Style.list}>
                        <div className={Style.listTop}>
                            <span className={Style.musicList} >播放列表</span>
                            <span className={Style.collection}><i className='iconfont icon-shoucang'></i>收藏全部</span>
                            <span className={Style.clearAll}><i className='iconfont icon-qingkong'></i>清空</span>
                            <span className={'iconfont icon-icon1 '+Style.ltclose}></span>
                        </div>
                        <Scrollbars
                         universal
                            style={{ width: '50.3rem', height: '45.6rem' }}
                            autoHide
                            autoHideTimeout={2000}
                            autoHideDuration={500}
                            renderThumbHorizontal={props => <div {...props}  />}
                            renderThumbVertical={props => <div {...props} className={Style['thumb-vertical']} />}
                            renderView={(props)=><div {...props}/>}
                        >
                            <div className={Style.listContainer}>
                                {/*{playListItemArr}*/}
                            </div>
                        </Scrollbars>
                    </div>
                </div>)
}

export { PlayList }
