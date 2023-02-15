import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();
const PORT = 8088

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req,res) => {
    res.send({ message: 'Hello, world!' });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);


const startServer = async () => {
    try {
        // connect to the database
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`server has started -> http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();