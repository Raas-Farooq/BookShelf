import mongoose from "mongoose"; 


const booksSchema = new mongoose.Schema({
    myId:{
        type:String,
        required:true,
        unique:true
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

booksSchema.index({myId:1},{unique:true})

const booksModel = mongoose.model('booksModel', booksSchema);


export default booksModel
// AIzaSyB6zftUyD0XGtYpWlTfAXzPccvoYvdM1Vc