import { Request, Response, NextFunction ,RequestHandler} from 'express';
import jwt ,{ JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';

interface IGetUserAuthInfoRequest extends Request {
    user ?: JwtPayload // or any other type
  }

const isAuthenticated : RequestHandler = async (req : IGetUserAuthInfoRequest, res : Response , next : NextFunction) => {
    let accessToken = req.header("Authorization") as string;    
  
    if (!accessToken) {
      return res.status(403).json({ message: "Access Denied" });
    }
    
    if (accessToken.startsWith("Bearer ")) {
      accessToken = accessToken.slice(7, accessToken.length).trimLeft();
    }
    try {
      // Verify the access accessToken
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
      req.user = decodedToken;
      next();
      console.log("Verified user");
    } catch (error) {
      return res.status(401).json({ message: "Token Expired" });
    }
  };

export default isAuthenticated;