import mongoose from "mongoose"; 


const booksSchema = new mongoose.Schema({
    myId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    authors:{
        type:Array,
        required:true
    },
    year:{
        type:String
    },
    publisher:{
        type:String
        
    }

})


const booksModel = mongoose.model('booksModel', booksSchema);


export default booksModel
// AIzaSyB6zftUyD0XGtYpWlTfAXzPccvoYvdM1Vc