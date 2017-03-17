import musicData from '../mockData/music'
async function  getMusicInfo (ctx){
    ctx.body=musicData
}
export default {getMusicInfo}
