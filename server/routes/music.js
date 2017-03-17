import Router from 'koa-router'
import music from '../controllers/music'

const router = new Router({prefix:'/music'})

router.get('/musicInfo',music.getMusicInfo)

export default router;

