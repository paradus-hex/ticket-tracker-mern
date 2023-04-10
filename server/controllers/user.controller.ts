import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import UserModel from '../models/user.model';
import jwtGenerator from '../utils/jwtGenerator.js';
import { Request, Response } from 'express';


const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await UserModel.getAll();

      res.status(200).json({ count: users.length, users });
    } catch (err) {
      console.log('getAllUsers query error: ', err);
      res.status(500).json({ msg: 'Unable to get users from database' });
    }
  },
  addUser: async (req: Request, res: Response) => {
    let { name, email, password } = req.body;

    try {
      //Look if user already exists
      const user = await UserModel.findByEmail(email);

      if (user) {
        return res.status(401).send('User already exists');
      }

      // password encryption before adding to DB
      const salt = await bcrypt.genSalt(1);
      // // Hashed password
      const hashedPassword = await bcrypt.hash(password, salt);

      //Add new user to DB
      let newUser = await UserModel.createUser(name,
        email,
        hashedPassword)

      //Generate Token
      const token = jwtGenerator(newUser.id);
      res.status(201).json({ message: 'User Created!', token });
    } catch (err) {
      console.log(
        `Failed to add ${name} to the database: `,
        '\n',
        err
      );
      res.status(400).json({ msg: 'Please review user and query' });
    }
  },

  getUser: async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await UserModel.findById(userId);
      res.status(200).json({ user });
    } catch (err) {
      console.log(`Failed to get user ${userId}: `, '\n', err);
      res.status(400).json({ msg: 'Please review user request query' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email, role } = req.body;

    try {
      const updatedUser = await UserModel.updateUserInformation(
        userId,
        name,
        email,
        role
      );
      res.status(201).json({ message: 'User updated!', updatedUser });
    } catch (err) {
      console.log(`Failed to update user ${userId}: `, '\n', err);
      res.status(400).json({ msg: 'Please review user update query' });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const deleteUser = await UserModel.deleteUser(userId);
      res.status(200).json({ msg: `User ${userId} successfully deleted` });
    } catch (err) {
      console.log(`Failed to delete user ${userId}: `, '\n', err);
      res.status(500).json({ msg: `Project deletion of ${userId} failed` });
    }
  }
};

export default userController;
