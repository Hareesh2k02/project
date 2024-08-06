const router = require("express").Router()
const { registerUser, loginUser, logOutUser, getUser, createUser, updateUser, deleteUser, adminLogin, userName } = require("../controllers/authControllers")
const { isAuthenticateduser, authorizedRole } = require("../middlewares/authenticate")


router.route('/register').post(registerUser)
router.route('/loginuser').post(loginUser)
router.route('/username').get(isAuthenticateduser,userName)
router.route('/logout').get(isAuthenticateduser,logOutUser)


//------Admin Route-----//
router.route('/adminlogin').post(adminLogin)
router.route('/getuser').get(isAuthenticateduser,authorizedRole("admin"),getUser)
router.route('/user/add').post(isAuthenticateduser,authorizedRole("admin"),createUser)
router.route('/user/:id').put(isAuthenticateduser,authorizedRole("admin"),updateUser)
                         .delete(isAuthenticateduser,authorizedRole("admin"),deleteUser)
 


module.exports = router


