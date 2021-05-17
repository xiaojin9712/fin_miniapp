// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'xavier-3gvpnyzo4eb01207s'
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = await cloud.database();
  const res = await db.collection('x_visit_record').add({
    data: {
      ...event
    }
  })
  return {
    data: res,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}