import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AI_User, AI_UserDBSchema } from 'src/db/user/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: AI_User.name, schema: AI_UserDBSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
