/**
 * 格式化时间
 * @param {*} t 总时间<3600
 * 转化成mm:ss
 */
function timeFormat(t) {
    function lten(t) {
        if (t < 10) {
            return '0' + t;
        } else {
            return t;
        }
    }
    t = parseInt(t);
    let m, s, fTime;
    if (t < 60) {
        lten(t);
        m = '00:';
        s = lten(t);
    } else if (t >= 60 && t < 3600) {
        m = parseInt(t / 60);
        s = lten(t % 60);
        m = lten(m)+':';
    }
    return fTime=m+s;
}
//遍历节点
const eleTraversal = (ele) => {
    let colection = [];
    colection.push(ele);
    let children = ele.children;
    Array.prototype.forEach.call(children, (item, index) => {
        colection = colection.concat(eleTraversal(item));
    })
    return colection;
}
export default{ timeFormat, eleTraversal }
