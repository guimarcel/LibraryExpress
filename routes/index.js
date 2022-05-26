const router = require('express').Router();

const usersRouter = require('./user.js');
const booksRouter = require('./book.js');

router.get('/', (request, response) => {
  return response.render('index', { title: 'Express' });
})

router.use('/users', usersRouter);
router.use('/books', booksRouter);

module.exports = router;