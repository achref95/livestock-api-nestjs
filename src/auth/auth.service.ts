import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserModel } from './user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async signup(username: string, password: string): Promise<User> {
    try {
      // Validate input
      if (!username || !password) {
        throw new Error('Provide username and password');
      }

      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!passwordRegex.test(password)) {
        throw new Error('Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter.');
      }

      // Check if user already exists
      const foundUser = await this.userModel.findOne({ username });
      if (foundUser) {
        throw new Error('User already exists.');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hashSync(password, 10);

      // Create the user
      const newUser: User = await this.userModel.create({ username, password: hashedPassword });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(username: string, password: string): Promise<{ authToken: string }> {
    try {
      
        if (username === "" || password === "") {
            throw new Error('Provide username and password');
        }
      
        const foundUser = await this.userModel.findOne({ username });
    
        if (!foundUser) {
            throw new Error('User not found');
        }
      
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      
        if (passwordCorrect) {
          const { _id, username} = foundUser;
      
          const payload = { _id, username };
          console.log("payload:", payload)
          
          const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "1h",
          });
          return { authToken }
        } else {
            throw new UnauthorizedException('Incorrect password');
        }
      } catch (error) {
        throw new Error(error);
    }
  }

  async verifyToken(token: string): Promise<{ payload: any }> {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET, { algorithms: ['HS256'] });
      return { payload: decoded };
    } catch (error) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
