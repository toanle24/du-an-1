import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import expressValidator from 'express-validator';

//Config
const app = express();
dotenv.config();
// app.user(cors());
app.use(cors({ credentials: 'same-origin' }));


import authRouter from './routes/auth';
import userRouter from './routes/user';
import categoryRoutes from './routes/category';
import productRoutes from './routes/product';
import contactRouter from './routes/contact' ;
import NewsRouter from './routes/News';
// Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: false,
    useCreateIndex: true
}).then(() => {
    console.log(`Database connected`);
});

mongoose.connection.on('Error', err => {
    console.log(`Database connected failed, ${err.message}`);
})
// Routes
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors({ credentials: 'same-origin' }));

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', contactRouter)
app.use('/api', NewsRouter)


const port = process.env.PORT || 8000;

// create server
app.listen(port, () => {
    console.log('Server is running on port ', port);
})