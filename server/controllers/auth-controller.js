const Book = require('../models/book')

const home = async (req, res) => {
    try {
        res
        .status(200)
        .send("Welcome to the page");
    } catch (error) {
        console.log(error.message);
    }
}

const getAllBooks = async(req, res) => {
    try {
        res
        .status(200)
        .json(await Book.find());
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addBooks = async(req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publication: req.body.publication
    })
    try {
        res.status(200)
        res.json(await book.save());
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getBooksById = async(req, res) => {
    try {
        res
        .status(200)
        .json(await Book.findById(req.params.id));
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateBooks = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(book==null)
            return res.status(404).json({message: 'Book not found'});

        if(req.body.title!=null) {
            book.title = req.body.title;
        }

        if(req.body.author!=null) {
            book.author = req.body.author;
        }

        if(req.body.publication!=null) {
            book.publication = req.body.publication;
        }

        res.status(200).json(await book.save());
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteBooks = async (req, res) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).send('Book not found');
      }
  
      res.status(204).json({message: 'Book successfully deleted'}) // Respond with no content on successful delete
    } catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).send('Server error');
    }
  };

module.exports = {home, getAllBooks, addBooks, getBooksById, updateBooks, deleteBooks};