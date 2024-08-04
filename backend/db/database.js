import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';



async function database(){

    try{
        await mongoose.connect(`mongodb://localhost:27017/bookish`);
        console.log('MOngoose is connected')
    }
    catch(err){
        console.log("got " + err + "while conneting Mongoose")
    }

}   

export default database
