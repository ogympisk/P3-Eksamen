const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'bolle', (err, decodedToken) =>{
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            }else{
                next()
            }
        })
    } else{
    res.redirect('/login')
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'bolle', async (err, decodedToken) =>{
     if (err) {
         res.locals.user = null;
         next();
     }else{
         let user = await User.findById(decodedToken.id)
         res.locals.user = user;
         next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}
const requireAdmin = (req, res, next) => {
    const token = req.cookies.admin

    if(token == 'true'){
      next()
    }else{
        res.redirect('/')
    }
} 
        


module.exports = { requireAuth, checkUser, requireAdmin};