import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import AuthRoutes from './Routes/Auth.routes.js';
import UserRoutes from './Routes/User.routes.js';
import GroupRoutes from './Routes/Group.routes.js';
import BudgetRoute from './Routes/Budget.route.js';

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
        this.app.use(cookieParser());
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
        this.app.use('/api/v1/', AuthRoutes);
        this.app.use('/api/v1/', UserRoutes);
        this.app.use('/api/v1/', GroupRoutes);
        this.app.use('/api/v1/', BudgetRoute);
    }
}

new Server();