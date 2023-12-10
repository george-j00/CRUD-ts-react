import express, { Router } from 'express'
import adminController from '../controllers/admin.controller';
const router =  Router();

router.get('/all-users' , adminController.getAllUsers );

export default router;