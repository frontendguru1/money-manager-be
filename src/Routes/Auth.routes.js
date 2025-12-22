import { Router } from 'express';
import AuthValidator from '../Validators/Auth.validator.js';
import AuthController from '../Controllers/Auth.controller.js';

class AuthRoutes {
    router = null;
    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    // POST routes
    postRoutes() {
        this.router.post('/register',  AuthValidator.validateRegistration, AuthController.register);

        // this.router.post('/login',  )
        // this.router.post('/logout',  )
        // this.router.post('/forgotPassword',  )
    }

    // GET routes
    getRoutes() {
        // this.router.get('/profile',  )
    }

    // PUT routes
    putRoutes() {

    }

    // DELETE routes
    deleteRoutes() {

    }
}

export default new AuthRoutes().router;