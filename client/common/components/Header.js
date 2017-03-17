import React from 'react'
import ReactDOM from 'react-dom'
import Style from '../sass/header'
export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={Style.header + " clearfix"}>
                <div className={Style.left}>
                    <span className=''></span>
                    <span className=''>我的音乐</span>
                </div>
                <div className={Style.right}>
                    <ul>
                        <li className='iconfont icon-min-lighter'></li>
                        <li className='iconfont icon-max-lighter'></li>
                        <li className='iconfont icon-close-lighter'></li>
                    </ul>
                </div>
            </div>

        );
    }
}
