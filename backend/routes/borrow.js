const router = require("express").Router()
const { isAuthenticateduser, authorizedRole } = require("../middlewares/authenticate")
const { myBook, returnBook, borrowedBooks, removeBook, bookStatus, requestBook, getReq, myNotify, cancelReq, approveBook, fine, record } = require("../controllers/borrowController")



// router.route('/borrow/:id').get(isAuthenticateduser,borrowBook)
router.route('/req').post(isAuthenticateduser,requestBook)
router.route('/mybook').get(isAuthenticateduser,myBook)
router.route('/mynotify').get(isAuthenticateduser,myNotify)
router.route('/return/:id').delete(isAuthenticateduser,returnBook)

//---------Admin Route------//
router.route('/admin/allbook').get(isAuthenticateduser,authorizedRole('admin'),borrowedBooks)
router.route('/admin/remove/:id').delete(isAuthenticateduser,authorizedRole('admin'),removeBook)
router.route('/admin/bookstatus').get(isAuthenticateduser,authorizedRole('admin'),bookStatus)
router.route('/admin/getreq').get(isAuthenticateduser,authorizedRole('admin'),getReq)
router.route('/admin/approve').post(isAuthenticateduser,authorizedRole('admin'),approveBook)
router.route('/admin/fine').get(isAuthenticateduser,authorizedRole('admin'),fine)
router.route('/admin/record').get(isAuthenticateduser,authorizedRole('admin'),record)
router.route('/admin/cancel/:id').get(isAuthenticateduser,authorizedRole('admin'),cancelReq)



module.exports = router