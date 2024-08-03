import express from 'express';
import cors from 'cors';
import database from './db/database.js';
import router from './routes/router.js';

const app = express();

app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 3005;

database().then
(() => {
    app.listen(Port, (() => console.log(" The NOURISHER ", Port)));
}) .catch(err => console.error('Failed to connect to database:', err));;


app.use('/bookish/api', router);



app.use((err,req, res, next) => {
    console.log(err.stack);
    res.status(500).send("something causing trouble ")
})





