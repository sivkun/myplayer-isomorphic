import types from '../constants/actionTypes'
import { Music } from './Music'

let _audioD = null;

function musicList(state = {}, action) {
    switch (action.type) {
        case types.INIT_MUSIC_INFO:
            let curMusic = new Music(action.musicInfo[0])
            return {
                ...state,
                play: action.musicInfo,
                mIndex: 0,
                curMusic: curMusic,
                // audioD: null
            }
        case types.SWITCH_STATUS:
        case types.MUSIC_CURRENT_TIME_SET:
        case types.MUSIC_DRAGE_TIME_SET:
        case types.UNDO_CONTROL:
            return {
                ...state,
                // audioD: audioDHandler(state, action),
                curMusic: curMusicHandle(state.curMusic, action)
            }
        case types.MUSIC_PLAY_BY_INDEX:
            curMusic = state.play[action.index];
            // if (_audioD && !_audioD.paused) _audioD.pause();
            // _audioD = new Audio(curMusic.url);
            // _audioD.play();
            // console.log(action.index);
            return {
                ...state,
                mIndex: action.index,
                curMusic: new Music(curMusic),
            }
        default:
            return state;
    }

}
const audioDHandler = (state, action) => {
    console.log('audioDHandler')
    switch (action.type) {
        case types.SWITCH_STATUS:
            if (!state.audioD) {
                _audioD = new Audio(state.curMusic.url)
            }
            if (_audioD.paused) {
                _audioD.play();
            } else {
                _audioD.pause();
            }
            return _audioD;
        default:
            return state;
    }
}
const curMusicHandle = (state = {}, action) => {
    // console.log('curMusicHandle')
    switch (action.type) {
        case types.SWITCH_STATUS:
            return {
                ...state,
                status: action.status
            }
        case types.MUSIC_CURRENT_TIME_SET:
            return {
                ...state,
                curTime: action.time
            }
        case types.MUSIC_DRAGE_TIME_SET:
        console.log(action.type)
            return {
                ...state,
                dragTime: action.time,
                // curTime: action.time
            }
        case types.UNDO_CONTROL:
            return{
                ...state,
                curTime:state.dragTime
            }
        default:
            return state
    }
}



export default musicList
