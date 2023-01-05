var express = require("express");
const { render } = require("../app");
const adminhelp = require("../helpers/adminhelp");
var router = express.Router();
var prohelpers = require("../helpers/prohelp");
const { route } = require("./usersrou");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var addmin = req.session.admin
  if (req.session.admin){
    prohelpers.getProduct().then((products) => {
      res.render("admin/adminprod", {
        title: "Admin panel",
        admin: true
        ,addmin,products
      });
    });
  }else{
    res.redirect('admin/adminLogin')
  }
  
});

router.post("/adminLogin", function (req, res) {
  console.log(req.body);
  adminhelp.adminlogin(req.body).then((response) => {
    console.log(response);
      req.session.admin = response;
      req.session.adminLoggedIn = true
      res.redirect("/admin");
    
  }).catch((err) =>{
    req.session.logErr=true
    res.redirect("adminLogin");
  })
  
});

router.get("/adminLogin", function (req, res, next) {
  var addmin=req.session.admin
  if(req.session.admin){
    res.redirect('/admin')
   
  }else{
    res.render('admin/adminLogin',{ title: "Admin panel",admin:true,addmin,logErr:req.session.logErr})
  }
  
});

router.get("/addpro", function (req, res, next) {
  var addmin=req.session.admin
  res.render("admin/addpro", { title: "Admin panel", admin: true,addmin });
});
router.post("/addpro", (req, res) => {
  prohelpers.addproduct(req.body, (result) => {
    console.log(result.insertedId);
    let image = req.files.img;

    image.mv(
      "./public/images/prodimg/" + result.insertedId + ".jpg",
      (err, done) => {
        if (!err) {
          res.redirect("/admin");
        } else {
          console.log(err);
        }
      }
    );
  });
});

router.get("/prodelete/:id", (req, res) => {
  let proid = req.params.id;
  prohelpers.deleteProduct(proid).then((respone) => {
    res.redirect("/admin");
  });
});

router.get("/proedit/:id", async (req, res) => {
  var addmin=req.session.admin
  let product = await prohelpers.updateProduct(req.params.id);
  res.render("admin/addedit", { product,title: "Admin panel",
  admin: true
  ,addmin });
});
router.post("/proedit/:id", (req, res) => {
  let id = req.params.id;
  prohelpers.changeProduct(req.params.id, req.body).then(() => {
    res.redirect("/admin");
    if (req.files.img) {
      let image = req.files.img;
      image.mv("./public/images/prodimg/" + id + ".jpg");
    }
  });
});

router.get('/users',function(req,res){
  var addmin=req.session.admin
  adminhelp.getusers().then((users)=>{
    console.log(users);
    res.render('admin/usersdet',{users,title: "Admin panel",
    admin: true
    ,addmin})
  })
  
})

router.get("/userdelete/:id", (req, res) => {
  let userid = req.params.id;
  adminhelp.deleteUser(userid).then((respone) => {
    res.redirect("/admin/users");
  });
});

router.get('/useredit/:id',async(req,res)=>{
  var addmin=req.session.admin
  let user = await adminhelp.getUser(req.params.id);
  res.render("admin/useredit", { user,title: "Admin panel",
  admin: true
  ,addmin });
  
})

router.post("/useredit/:id", (req, res) => {
  console.log(req.body);
  adminhelp.changeUser(req.params.id,req.body).then(() => {
    res.redirect("/admin/users");
  });
});

router.post('/search-user', (req,res)=>{
  console.log(req.body)
  var addmin=req.session.admin
  adminhelp.searchUser(req.body).then((data)=>{
    console.log(data);
    res.render('admin/searchResult',{data,title: "Admin panel",
    admin: true
    ,addmin})
  }).catch((err)=>{
    console.log(err);
  })
  
  
})

router.get('/adminLogout',function(req,res){
  req.session.admin=null
  res.redirect("adminLogin") 
})
module.exports = router;

let obj={first:'hjbk',second:'hgfh'}

let {a,b,c}=obj
