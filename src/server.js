import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoutes from './Routes/Auth.routes.js';

class Server {
    app = express();
    port = null;
    constructor() {
        this.setConfig();
        this.connectDB();
        this.setRoutes();
    }

    setConfig() {
        dotenv.config({ path: './.env' });
        this.port = process.env.PORT;

        this.app.use(express.json());
    }

    connectDB() {
        mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log('Database Connected successfully!');
            this.start();
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }

    setRoutes() {
        // backURL + /api/v1/

        this.app.use('/api/v1/', AuthRoutes);



    }
}

new Server();