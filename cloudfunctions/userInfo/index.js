// 云函数入口文件
const cloud = require('wx-server-sdk')
const COLLECTION = 'x_user_info';
cloud.init({
  env: 'xavier-3gvpnyzo4eb01207'
})
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.type) {
    case 'getUserList': {
      return getUserList(event.data)
    }
    case 'getUserInfo': {
      return getUserInfo(event.data)
    }
    case 'setUserInfo': {
      return setUserInfo(event.data)
    }
    default: {
      return
    }
  }
}

async function getUserList(query) {
  return db.collection(COLLECTION).get();
}

async function setUserInfo(data) {
  return db.collection(COLLECTION).add({
    data: {
      ...data
    }
  });
}