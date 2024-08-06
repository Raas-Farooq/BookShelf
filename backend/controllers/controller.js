import Books from "../fetchData/booksData.js";
import booksModel from '../models/model.js';
import { body, param, validationResult } from "express-validator";


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
            imageLink: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail : '',
            authors: book.volumeInfo.authors || [],
            year: book.volumeInfo.publishedDate || 0,
            publisher: book.volumeInfo.publisher || '',
          }));
  
        if (books.length > 0) {
           
          await booksModel.insertMany(books);
          console.log("Books inserted into database");
        }
      }
      if (books.length > 0) {
        res.status(200).json({
          success:true,
          message:"successfully Accessed the Books Data",
          books
        });
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

  const validateBookEdit = [
    param('id').isString().notEmpty().withMessage('Valid book ID is required'),
    body('updatedTitle').isString().notEmpty().withMessage('Title is required'),
    body('updatedAuthors').isArray().withMessage('Authors should be an array'),
    body('updatedAuthors.*').isString().withMessage('Each author should be a string'),
    body('newYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Valid year is required'),
  ];

  const editBook = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(404).json({erros:errors.array()})
    }


    try{

      
      const id = req.params.id;
      console.log("id :", id);
      
      const {updatedTitle, updatedAuthors, newYear} = req.body;
      
      const exist = await booksModel.findOneAndUpdate(
        {myId:id}, 
        {title:updatedTitle, authors:updatedAuthors, year:newYear},
        {new: true, runValidators:true}
      );
      if(!exist){
        return res.status(404).json({
          success:false,
          message:"Concerned book is not there"
        })
      }
      console.log("exist: ", exist);
      res.status(201).json({
        success:true,
        message:'book Updated',
        updatedBook:exist
      })

    }
    catch(e){
      console.log("got some Err while editing ", e);
      res.status(500).json({
        succss:false,
        message:"unable to Edit.. error occurred",
        error:e.message
      })
    }
  }


  async function deleteBook(req, res){
    try{
      const id = req.query.id;
      console.log("id after repeated errs: ", id);
      const isExist = await booksModel.findOne({myId:id});
      
      if(!isExist){
        
        return res.status(404).json({
          success:false,
          message:"Book didnt exist",
          books:googleBooks
        })
      }


      const del = await booksModel.deleteOne(isExist);
      console.log('del ', del);
      if(del.deletedCount){
        return res.status(201).json({
          success:true,
          message:"successfully Remove the Book"
        })
      }
      else{
        return res.status(404).json({
          success:false,
          message:"Book Exist but Not Able to Delete the Book"
        })
      }
      
    }catch(err){

      console.log("err while fetching Id");
      res.status(500).json({
        success:false,
        message:'Error Occured during Id Access', 
        error:err.message
      })
    }
  }


export default {getAll, addBook, editBook, validateBookEdit, deleteBook}