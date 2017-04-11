import types from '../constants/actionTypes'
import request from 'superagent'
import fetch from 'isomorphic-fetch'
function initMusicInfo(musicInfo){
    return {
        type:types.INIT_MUSIC_INFO,
        musicInfo
    }
}
function fetchMusicInfo(){
    // console.log("what a fuck");
    return (dispatch)=>{
        //  console.log("what a fuck yet")
        return request
            .get('http://localhost:3000/api/music/musicInfo')//https://api.github.com/search/repositories?q=javascript&sort=stars
            .withCredentials()
            .set('Accept', 'application/json')
            .then(res=>{
                // console.log('hh',res.body.info);
               return  dispatch(initMusicInfo(res.body.info));
            })
        //  return fetch('/api/music/musicInfo')
        // .then((res)=>{
        //     console.log('hh',res);
        //     return res.json()
        // }).then((json)=>{
        //     console.log('hh',json);
        //    return  dispatch(initMusicInfo(json));
        // })
        // console.log("fuckfuckfuck");
    }
}
function switchStatus(status){
    return {
        type:types.SWITCH_STATUS,
        status
    }
}

//设置当前音乐的当前时间
const setMusicCurTime= (time)=>{
    return{
        type:types.MUSIC_CURRENT_TIME_SET,
        time
    }
}
const setCurMusicIndex = (index)=>{
    return{
        type:types.MUSIC_PLAY_BY_INDEX,
        index
    }
}
//点击或拖动播放进度条进度条
const setDragTime=(time)=>{
    return {
        type:types.MUSIC_DRAGE_TIME_SET,
        time
    }
}
//标记control为false。
const undoControl = (time)=>{
    return {
        type:types.UNDO_CONTROL,
        value:time
    }
}
//设置音量
function setVolume(value){
    return{
        type:types.VOLUME_SET,
        value:value
    }
}
// function setMusicIndex(){

// }
export default{
    fetchMusicInfo,
    switchStatus,
    setMusicCurTime,
    setCurMusicIndex,
    setDragTime,
    undoControl,
    setVolume
}


