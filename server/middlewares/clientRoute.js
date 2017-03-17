import React from 'react'
import {renderToString} from 'react-dom/server'
import {match,RouterContext} from 'react-router'
import {Provider} from 'react-redux'
import routes from '../../client/routes'
import configureStore from '../../client/common/store/configureStore'
import {fetchMusicInfo} from '../../client/common/actions'
const store = configureStore()
store.getState();
async function clientRoute(ctx,next){
    let _renderProps
    //react-router服务器端路由匹配,由于match属于异步操作，因此使用await关键字，在match返回前不会往下执行。
    await match({routes,location:ctx.url},(error,redirectLocation,renderProps)=>{
        _renderProps=renderProps
    })
    if(_renderProps){
        await store.dispatch(fetchMusicInfo());
        /*const root={
            root: renderToString(
                <Provider store={store}>
                    <RouterContext {..._renderProps}/>
                </Provider>
            ),
            state:store.getState()
        }
        console.log(root);*/
        await ctx.render('index',{
            root: renderToString(
                <Provider store={store}>
                    <RouterContext {..._renderProps}/>
                </Provider>
            ),
            state:store.getState()
        })
    }else{
        await next()
    }
}
export default clientRoute
