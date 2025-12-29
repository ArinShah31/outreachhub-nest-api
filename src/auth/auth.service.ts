import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User } from './schemas/user.schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService : JwtService,
    ){}

    async login(username:string, password:string){
        const user = await this.userModel.findOne({username});
        if(!user){
            throw new UnauthorizedException ('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user._id,
            username: user.username,
            role : user.role,
            workspaceId: user.workspaceId,
        };

        return{
            access_token: this.jwtService.sign(payload),
            role: user.role,
            username: user.username,
        };
    }
}
