import Books from "../fetchData/booksData.js";
import booksModel from '../models/model.js';


const removeDuplicates = async () => {
    try {
      const result = await booksModel.aggregate([
        // Group by myId
        { $group: {
            _id: "$myId",
            dups: { $addToSet: "$_id" },
            count: { $sum: 1 }
        }},
        // Filter where count is greater than 1
        { $match: { count: { $gt: 1 } } },
        // Keep only the first document in each group
        { $project: {
            _id: 0,
            toKeep: { $first: "$dups" },
            toRemove: { $slice: ["$dups", 1, { $subtract: ["$count", 1] }] }
        }}
      ]);
  
      // Remove the duplicate documents
      for (let doc of result) {
        await booksModel.deleteMany({ _id: { $in: doc.toRemove } });
      }
  
      console.log(`Removed ${result.reduce((sum, doc) => sum + doc.toRemove.length, 0)} duplicate documents`);
    } catch (err) {
      console.error("Error removing duplicates:", err);
    }
  };

  
const getAll = async (req, res) => {
    try {
        
      let books = await booksModel.find({}).sort({ myId: 1 });
  
      if (books.length === 0) {
        console.log("Books didn't exist, fetching from API");
        const booksFromApi = await Books();
        const apiBooks = booksFromApi?.items || [];
  
        books = apiBooks.map(book => ({
          myId: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || [],
          year: book.volumeInfo.publishedDate || '',
          publisher: book.volumeInfo.publisher || '',
        }));
  
        if (books.length > 0) {
           
          await booksModel.insertMany(books);
          console.log("Books inserted into database");
        }
      }
  
      if (books.length > 0) {
        // removeDuplicates();
        let i = 0;
        let finalList = [];
        while(i < books.length){
            const myTitle = books[i].title || '';
            console.log("myTitle: ", myTitle)
            i++;
            if(!myTitle){
                console.log("myTitle is Null: ")
            }
            else{
                for (const book of books){
                    if(book.title === myTitle){
                        finalList.push(book);
                    }
                }
            }
            
        }
        console.log("this is teh Unique List: ", finalList.length);
        

        console.log("Successfully sent the response");
        res.status(200).json(books);
      } else {
        res.status(404).json({ message: "No Books Found" });
      }
    } catch (err) {
      console.error("Error in getAll function:", err);
      res.status(500).json({ error: err.message });
    }
  };

const addBook = async (req, res) => {
    try {
      const newBook = req.body;
      const existingBook = await booksModel.findOne({ myId: newBook.myId });
  
      if (existingBook) {
        return res.status(409).json({ 
          success: false, 
          message: "This book already exists" 
        });
      }
  
      const addedBook = await booksModel.create(newBook);
      console.log("Added Book:", addedBook);
  
      return res.status(201).json({
        success: true,
        message: "Book added successfully",
        book: addedBook
      });
  
    } catch (err) {
      console.error("Error adding book:", err);
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while adding the book",
        error: err.message 
      });
    }
  };

export default {getAll, addBook}