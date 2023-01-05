var db = require("../config/mongoconn");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");

module.exports = {
  doSignup: (userdata) => {
    
    return new Promise(async (resolve, reject) => {
      userdata.Password = await bcrypt.hash(userdata.Password,10);
      db.get().collection(collection.UserCollection).insertOne(userdata).then((data)=>{
        
        resolve(userdata);
      });
    
    });
  },
  doLogin:(userdata)=>{

    return new Promise(async(resolve,reject)=>{
        let response={}
        let User=await db.get().collection(collection.UserCollection).findOne({Email:userdata.EEmail})
        if(User){
            bcrypt.compare(userdata.PPassword,User.Password).then((status)=>{
                if(status){
                    console.log('login success');
                    response.user=User
                    response.status=true
                    resolve(response)
                }else{
                    console.log("login failed")
                    resolve({status:false})
                }
            })
        }
        else{
            console.log('lllogin failed')
            resolve({status:false})
        }
    })
  }
};
