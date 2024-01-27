// const checkAuth = new Map();

// function setCheckAuth(sessionId, user) {
//     checkAuth.set(sessionId, user);
// }

// function getCheckAuth(sessionId) {
//     return checkAuth.get(sessionId);
// }

// module.exports = { setCheckAuth, getCheckAuth }


// !using jwt

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const setCheckAuth = (user) => {
    const payload = {
        _id : user._id,
        email: user.email
    }
    const token = jwt.sign(payload, secretKey);
    return token
}

const getCheckAuth = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded
    } catch (error) {
        console.log(error);
    }
}

module.exports = { setCheckAuth, getCheckAuth }