import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import compress from 'koa-compress'
import convert from 'koa-convert'

const app = new Koa()
var cors = require('koa-cors');
app.use(convert(cors()))
app.keys = ['this is a fucking secret2']
app.use(convert(session(app)))
app.use(compress())
app.use(bodyParser())
app.use(json())
app.use(logger())

export default app
