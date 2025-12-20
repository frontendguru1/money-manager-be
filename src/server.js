import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
        this.app.get('/', (req, res) => {
            res.json(
                {
                    name: "Money Manager API test",
                    version: "1.0.0",
                    description: "This is a simple money manager API built with Express.js",
                }
            ).status(200);
        });


    }
}

new Server();
