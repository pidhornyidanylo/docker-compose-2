const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./Book");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(() => console.log("MONGO RUNNING")).catch((err) => console.log(err));

// get books
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

app.post("/api/books", async (req, res) => {
    const {
        body
    } = req;
    try {
        const newBook = new Book({
            title: body.title,
            author: body.author,
            year: body.year,
        })
        const savedBook = await newBook.save();
        res.status(200).json({
            message: "Book added successfully",
            data: savedBook
        });
    } catch (error) {
        res.status(400)
    }
})

app.patch("/api/books/:id", async (req, res) => {
    const {
        id
    } = req.params;
    const {
        title,
        author,
        year
    } = req.body;

    try {
        let book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (title) {
            book.title = title;
        }
        if (author) {
            book.author = author;
        }
        if (year) {
            book.year = year;
        }

        const updatedBook = await book.save();

        res.status(200).json({
            message: "Book updated successfully",
            data: updatedBook
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.delete("/api/books/:id", async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const bookToDelete = await Book.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Book deleted successfully",
            deletedBook: bookToDelete
        });
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
})


const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => console.log("SERVER RUNNING"));