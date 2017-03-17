import { combineReducers } from 'redux'
import musicList from './musicList'
import {control} from './control'
const rootReducer = combineReducers({control,musicList})

export default rootReducer;
