import Books from "../fetchData/booksData.js";
import booksModel from '../models/model.js';


const getAll = async(req,res) => {
    try{
        const books = await Books();
     
        // for (const booky of books.items){
        //     console.log("booky   Year: ", booky.volumeInfo.publishedDate);
        // }
        
        const myBooks = books.items.map(book => (
            {
                myId : book.id,
                title:book.volumeInfo.title,
                authors:book.volumeInfo.authors,
                year:book.volumeInfo.publishedDate,
                publisher:book.volumeInfo.publisher,
                
                }
        ))

        if(myBooks.length){
            const bulkOps = myBooks.map(book => ({
                updateOne: {
                  filter: { myId: book.myId },
                  update: { $set: book },
                  upsert: true
                }
              }))
            const result = await booksModel.bulkWrite(bulkOps);
            console.log(":result:", result )
;        }
        const getBooks = await booksModel.find({}).sort({myId:1});
        if(getBooks.length > 0){
            console.log("successfully sent the Response");
            res.status(200).json(getBooks)
        }   
        
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}

const addBook = async(req,res) => {
    try{
        // console.log("successfully executed YOur Back Request");

        const newBook = req.body;
        console.log("new Book: ", newBook);
        // const added = await booksModel.create(newBook);
        // if(added){
        //     res.json({message:"Book Added. Success!"})
        // }
        // else{
        //     res.json({message:"Something stopping Book insertion"})
        // }
        // res.status(200).json({message:"Few Are Made for Independance It is the Privilege Of Strong"})
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}

export default {getAll, addBook}