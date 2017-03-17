import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import Style from '../sass/sidebar'
// import {eleTraversal} from './utils'
const Icon = ({ iconName }) => {
    let className = 'iconfont ' + iconName;
    return (
        <i className={className}></i>
    );
}
const SidebarLink = (props) => {
    return (
        <Link {...props} className={Style.link} activeClassName={Style.link__active} />
    );
}

const SidebarItem = ({ children, path, iconName }) => {
    return (
        <div>
            <SidebarLink to={path}><Icon iconName={iconName} /><span>{children}</span></SidebarLink>
        </div>
    );
}

const SidebarHeader = ({ change }) => {
    return (
        <div className={Style.header}>
            <Icon iconName='icon-sangang' />
        </div>
    );
}
const SidebarBase = ({ change }) => {
    return (
        <div className='sidebar-base'>
            <SidebarItem path='/' iconName='icon-sousuo'>搜索</SidebarItem>
            <SidebarItem path='/findMusic' iconName='icon-yinle'>发现音乐</SidebarItem>
            <SidebarItem path='/mv' iconName='icon-mv1'>MV</SidebarItem>
            <SidebarItem path='/friends' iconName='icon-pengyou'>朋友</SidebarItem>
        </div>
    );
}
const SidebarMyMusic = ({ change }) => {
    return (
        <div className={Style.myMusic}>
            <div className={Style['myMusic-title']}>我的音乐</div>
            <SidebarItem path='/' iconName='icon-bendiyinle'>本地音乐</SidebarItem>
            <SidebarItem path='/findMusic' iconName='icon-icon'>下载管理</SidebarItem>
            <SidebarItem path='/mv' iconName='icon-zuijin'>最近播放</SidebarItem>
            <SidebarItem path='/friends' iconName='icon-5'>我音乐云盘</SidebarItem>
            <SidebarItem path='/friends' iconName='icon-wodeshoucang'>我的收藏</SidebarItem>
        </div>
    )
}
const SidebarPlaylist = ({ change }) => {
    return (
        <div className={Style.playlist}>
            <div className={Style['playlist-title']}>创建的歌单<i className='iconfont icon-zengjia'></i></div>
            <SidebarItem path='/' iconName='icon-bendiyinle'>本地音乐</SidebarItem>
            <SidebarItem path='/findMusic' iconName='icon-icon'>下载管理</SidebarItem>
            <SidebarItem path='/mv' iconName='icon-zuijin'>最近播放</SidebarItem>
            <SidebarItem path='/friends' iconName='icon-5'>我音乐云盘</SidebarItem>
            <SidebarItem path='/friends' iconName='icon-wodeshoucang'>我的收藏</SidebarItem>
        </div>
    );
}

const SidebarUser = ({ change }) => {
    return (
        <div className={Style.User}>
            <span className={"iconfont icon-u_icon " + Style['User-avator']}></span>
            <span className={Style['User-name']}>Sivkun</span>
            <span className={'iconfont icon-youjian ' + Style['User-email']}></span>
            <span className={'iconfont icon-shezhi ' + Style['User-setting']}></span>
        </div>
    );
}

class ContainerSideBar extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div ref="sidebar" className={Style.sidebar + ' clearfix'}>
                <SidebarHeader sidbarMinorMax={this.sidbarMinorMax} />
                <Scrollbars
                    universal
                    className={Style.scrollbar}
                    style={{ width: '18.2rem', height: 500 }}
                    autoHide
                    autoHideTimeout={2000}
                    autoHideDuration={500}
                    renderThumbHorizontal={props => <div {...props}  />}
                    renderThumbVertical={props => <div {...props} className={Style['thumb-vertical']} />}
                    renderView={(props)=><div {...props} />}
                >
                    <SidebarBase />
                    <SidebarMyMusic />
                    <SidebarPlaylist />
                </Scrollbars>
                <SidebarUser />
            </div>
        )
    }
}
ContainerSideBar.defaultProps = {

};
export default ContainerSideBar;


