// const User = require('../models/User');
// const { compare, hash } = require('bcrypt');


// async function register(reqData) {
//     const existing = await User.findOne({email: reqData.email});

//     if (existing) {
//         throw new Error ('Email is taken.')
//     }

//     const hashedPassword = await hash(reqData.password, 10);

//     const user = new User({
//         firstName: reqData.firstName,
//         lastName: reqData.lastName,
//         hashedPassword,
//         gender: reqData.gender,
//         email: reqData.email,
//         seqQuestion: reqData.seqQuestion,
//         seqAnswer: reqData.seqAnswer,
        
//     });

//     await user.save();

//     return user;
// };

// async function login (email, password) {
//     const user = await User.findOne({ email: email});
    
//     if (!user) {
//         throw new Error('Incorrect username or password');
//     }

//     const hasMatch = await compare(password, user.hashedPassword);

//     if (!hasMatch) {
//         throw new Error ('Incorrect username or password');
//     }

//     user.rating += 10;
//     if (user.rating <= 199) {
//         user.rank = 1;
//         user.level = 'Bronze'
//     } else if (user.rating > 199 && user.rating < 500) {
//         user.rank = 2; 
//         user.level = 'Bronze'
//     } else if (user.rating > 499 && user.rating < 800) {
//         user.rank = 3;
//         user.level = 'Silver'
//     } else if (user.rating > 799 && user.rating < 1400) {
//         user.rank = 4;
//         user.level = 'Silver'
//     } else if (user.rating > 1399 && user.rating < 2100) {
//         user.rank = 5;
//         user.level = 'Silver'
//     } else if (user.rating > 2099 && user.rating < 3000) {
//         user.rank = 6;
//         user.level = 'Gold'
//     } else if (user.rating > 2999 && user.rating < 4500) {
//         user.rank = 7;
//         user.level = 'Gold'
//     } else if (user.rating > 4499 && user.rating < 7000) {
//         user.rank = 8;
//         user.level = 'Gold'
//     } else if (user.rating > 6999 && user.rating < 10500) {
//         user.rank = 9;
//         user.level = 'Platinum'
//     } else if (user.rating > 10499 && user.rating < 16000) {
//         user.rank = 10;
//         user.level = 'Platinum'
//     } else if (user.rating > 15999) {
//         user.rank = 11;
//         user.level = 'Diamond'
//     }
//     await user.save();

//     return user;
// }

// async function getUserByEmail (email) {
//     return await User.findOne({ email })  
// }

// async function getUserById (id) {
//     return await User.findById(id);
// }

// async function getAllUsers () {
//     return await User.find({});
// }

// module.exports = {
//     register,
//     login, 
//     getUserByEmail, 
//     getUserById, 
//     getAllUsers

// }