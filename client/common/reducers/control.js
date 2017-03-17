import types from '../constants/actionTypes'

export function control(state={},action){
    switch(action.type){
        case types.INIT_MUSIC_INFO:
            return {
                // mIndex:0,
                control:false,//progress通过进度条控制播放进度
                volume:0.5,
                playPattern:['single','loop','order','random'],
                ppIndex:1
            }
        case types.MUSIC_DRAGE_TIME_SET:
        return{
            ...state,
            control:'progress'
        }
        case types.UNDO_CONTROL:
        console.log('control,UNDO_CONTROL')
        return{
            ...state,
            control:false
        }
        default:
        return state;
    }
}
