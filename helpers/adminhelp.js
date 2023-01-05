var db = require("../config/mongoconn");
var collection = require("../config/collections");
const { response } = require("../app");
var objectid= require('mongodb').ObjectId

module.exports = {
  adminlogin: (admindata) => {
    return new Promise(async (resolve, reject) => {
      let Admin = await db
        .get()
        .collection(collection.AdminCollection)
        .findOne({ Email: admindata.Email });
      if (Admin) {
        if (Admin.password == admindata.Password) {
          console.log("admin loggedin");
          resolve(Admin);
        } else {
          console.log("admin login failed");
          reject({logErr: false });
        }
      }
      else{
        reject({status : false})
      }
    })
  },
  getusers:()=>{
    return new Promise(async(resolve,reject)=>{
      let users=await db.get().collection(collection.UserCollection).find().toArray()
      resolve(users)
    })
  },

  deleteUser:(userid)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.UserCollection).deleteOne({_id:objectid(userid)}).then((response)=>{
            resolve(response)
        })
    })
},

getUser:(userid)=>{
  return new Promise((resolve,reject)=>{
      db.get().collection(collection.UserCollection).findOne({_id:objectid(userid)}).then((user)=>{
          resolve(user)
      })
  })
},

changeUser:(userid,userDetails)=>{
  console.log(userDetails);
  return new Promise((resolve,reject)=>{
      db.get().collection(collection.UserCollection).updateOne({_id:objectid(userid)},{
          
        $set:{
              Name:userDetails.Name,
              Uname:userDetails.Uname,
              Email:userDetails.Email
          }
      }).then((response)=>{
          resolve()
      })
  })
},

searchUser:(userinfo)=>{
  return new Promise(async (resolve,reject)=>{
      let user = db.get().collection(collection.UserCollection).findOne({Name:userinfo.search});

      if(user){
        resolve(user)
      }
      else{
        reject({status :false})
      }
  })
},

};
