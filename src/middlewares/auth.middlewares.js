// const { getCheckAuth } = require('../utils/checkAuth');
// function userCheck(req, res, next) {
//    try {
//     const { sessionId } = req.cookies;
//     if (!sessionId) {
//         return res.status(401).redirect('/login');
//     }
//     const user = getCheckAuth(sessionId);
//     if (!user) {
//         return res.status(401).redirect('/login');
//     }
//     req.user = user;
//     next();
//    } catch (error) {
//     res.status(500).json({
//         success: false,
//         message: error.message
//     });
//    }
// }

// module.exports = { userCheck }

// !using jwt
const { getCheckAuth } = require('../utils/checkAuth');

function userCheck(req, res, next) {
    try {
     const { token } = req.cookies;
     if (!token) {
          return res.status(401).redirect('/login');
     }
     const user = getCheckAuth(token);
     if (!user) {
          return res.status(401).redirect('/login');
     }
     req.user = user;
     next();
    } catch (error) {
     res.status(500).json({
          success: false,
          message: error.message
     });
    }
}

module.exports = { userCheck }