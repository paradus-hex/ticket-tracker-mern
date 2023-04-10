import dotenv from 'dotenv';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

interface UserRequest extends Request {
  user?: JwtPayload;
}

export default async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json('Not Authorized');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET as Secret) as JwtPayload;;

    req.user = payload.user;

    next();
  } catch (err) {
    console.log(err);
    // console.error(err.message);
    return res.status(403).json('Not Authorized');
  }
};
