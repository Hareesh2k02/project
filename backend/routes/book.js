const router = require('express').Router()
const { getBooks, newBook, singleBook, updateBook, deleteBook } = require('../controllers/bookControllers')
const { isAuthenticateduser, authorizedRole } = require('../middlewares/authenticate')



router.route('/books').get(isAuthenticateduser,getBooks)
router.route('/books/:id').get(isAuthenticateduser,singleBook)
//-----------admin routes--------//
                          .put(isAuthenticateduser,authorizedRole('admin'),updateBook)
                          .delete(isAuthenticateduser,authorizedRole('admin'),deleteBook)
router.route('/books/new').post(isAuthenticateduser,authorizedRole('admin'), newBook)



module.exports = router