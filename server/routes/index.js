import fs from 'fs'
import path from 'path'
import Router from 'koa-router'

const router = new Router({prefix:'/api'})
let subRouter
router.get('/',function(ctx){
    ctx.body={
        name:'sfq'
    }
})
fs.readdirSync(__dirname)
.filter(filename =>filename!==path.basename(__filename))
.forEach(filename =>{
    subRouter=require(`./${filename}`)
    router.use(subRouter.routers(),subRouter.allowedMethods())
})
export default router
