import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

function jwtGenerator(user_id: string) {
  const payload = {
    user: user_id
  };
  const secret = process.env.JWT_SECRET
  if (secret)
    return jwt.sign(
      payload,
      secret
    );
}

export default jwtGenerator;
