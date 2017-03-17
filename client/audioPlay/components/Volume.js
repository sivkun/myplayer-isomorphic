import React from 'react'
import ReactDOM from 'react-dom'
// import drag from './Drag'
import Style from '../scss/Volume.scss'
export default class Volume extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div ref='volume' className={Style.volume}>
        <div className={Style.Controll+" "+Style.hidden} ref="vcShow" >
          <div className={Style.vcArrow}>
            <em></em>
            <i></i>
          </div>

          <span className={"iconfont icon-volume2 "+Style.vcIcon}></span>

          <div className={Style.vcbarView} ref='vcbarView' >
            <div className={Style.barbg} ref='barbg'>
              <div className={Style.cur} ref='cur' >
                <span className={Style.curDot} ref='curDot' ></span>
              </div>
            </div>
          </div>

        </div>

        <span className="iconfont icon-volume2" ></span>
      </div>
    )
  }
}

