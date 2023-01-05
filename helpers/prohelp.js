var db=require('../config/mongoconn')
var collection=require('../config/collections')
var objectid= require('mongodb').ObjectId
module.exports={
    addproduct:(product,callbk)=>{
        console.log(product);
        db.get().collection(collection.ProCollection).insertOne(product).then((data)=>{
            
            callbk(data);
        })
    },
    getProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let product=await db.get().collection(collection.ProCollection).find().toArray()
            
            resolve(product)
        })
    },

    deleteProduct:(proid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ProCollection).deleteOne({_id:objectid(proid)}).then((response)=>{
                resolve(response)
            })
        })
    },
    updateProduct:(proid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ProCollection).findOne({_id:objectid(proid)}).then((product)=>{
                resolve(product)
            })
        })
    },
    changeProduct:(proid,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ProCollection).updateOne({_id:objectid(proid)},{
                $set:{
                    bname:proDetails.bname,
                    mname:proDetails.mname,
                    pname:proDetails.pname
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
    
}