import express from 'express';
import cors from 'cors';
import database from './db/database.js';
import router from './routes/router.js';
import booksData from './fetchData/booksData.js';


const app = express();

app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 3005;

async function serverSetup(){
    await database().then
    (() => {
        app.listen(Port, (() => console.log("The Opt Forgiving", Port)));
    }) .catch(err => console.error('Failed to connect to database:', err));;

}

serverSetup().catch(console.error);


app.use('/bookish/api', router);

// const books = booksData();
// console.log("books: ", books)
app.use((err,req, res, next) => {
    console.log(err.stack);
    res.status(500).send("something causing trouble ")
})





