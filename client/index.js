import React from 'react'
import {render} from 'react-dom'
import {Router, match, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import routes from './routes'
import configureStore from './common/store/configureStore'

const store = configureStore(window.REDUX_STATE)
 console.log(window.REDUX_STATE,store.getState());
match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    // console.log({...renderProps});
    render(
        <Provider store={store}>
            <Router {...renderProps}/>
        </Provider>,
        document.getElementById('root')
    )
})
