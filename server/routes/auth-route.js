const express = require('express');
const router = express.Router();
const {home, getAllBooks, addBooks, getBooksById, updateBooks, deleteBooks} = require('../controllers/auth-controller')

router.get('/', home);

router.get('/all', getAllBooks);

router.post('/addBooks', addBooks);

router.get('/books/:id', getBooksById);

router.patch('/books/:id', updateBooks);

router.delete('/books/:id', deleteBooks);

module.exports = router;