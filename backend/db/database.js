import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;

async function database(){

    try{
        await mongoose.connect(MONGODB_URI);
        console.log('MOngoose is connected')
    }
    catch(err){
        console.log("got " + err + "while conneting Mongoose")
    }

}   

export default database
