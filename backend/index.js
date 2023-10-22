import express, { request, response } from "express";
import { PORT } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//  Middleware for parsing request body
app.use(express.json());

//  Middleware for handling CORS POLICY
//  Option 1: Allow All Origins with default of cors(*)
app.use(cors());
//  Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    })


