import express, { Router } from 'express'
import userController from '../controllers/user.controller'
import upload from '../services/multer'
import isAuthenticated from '../middlewares/authMiddleware';

const router =  Router();

router.post("/api/user/signup", userController.signUp);
router.post("/api/user/login", userController.login);
router.post("/api/user/edit-profile/:userId" ,isAuthenticated, upload.single('image') ,userController.editProfile);

export default router;
