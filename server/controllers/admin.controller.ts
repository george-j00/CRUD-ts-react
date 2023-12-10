import User from "../modals/user.schema";
import { Request, Response } from "express";
import { UserType } from "../types/IUser";


const getAllUsers  = async (req : Request, res : Response) => {
    try {
      const allUsers = await User.find();
      return res.status(201).json({ users: allUsers });
    } catch (error) {
      return res.status(500).json({ error: "Error for getting users " });
    }
  };


export default {
    getAllUsers 
} ;