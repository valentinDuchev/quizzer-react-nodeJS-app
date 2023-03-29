// const req = require('express/lib/request');
// const res = require('express/lib/response');
// const jwt = require('jsonwebtoken');
// const atob = require('atob')

// const secret = process.env.SECRET;

// function generateAccessToken (email, firstName, lastName, gender) {
//     return jwt.sign({ email, firstName, lastName, gender }, secret, {
//         expiresIn: "16h"
//     });
// };

// function isUser (req, res, next) {
//     const token = req.headers['authorization'];

//     if (!token) {
//         console.log('!token')
//         throw new Error('Access Denied')
//     } 
    
//     try {
//         const data = jwt.verify(token, secret);
//         req.email =  data.email;
//         req.firstName = data.firstName;
//         req.lastName = data.lastName;
//         req.gender = data.gender;
//         next();
//     } catch (err) {
//         console.log(err)
//         return res.status(401).json({ message: 'Access Denied' });
//     }
// }

// function isGuest (req, res, next) {
//     const token = req.cookies.access_token;

//     if (token) {
//         throw new Error ('You have already logged in / There is already an user in the session');
//     }

//     try {
//         next()

//     } catch (err) {
//         return res.status(401).json({ message: err.message });
//     }

// }

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// };

// module.exports = {
//     // authenticateToken,
//     generateAccessToken, 
//     isUser, 
//     isGuest, 
//     parseJwt

// }