import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AI_User, AI_UserDBSchema } from './db/user/user.model';
import { BotService } from './bot/bot.service';
import { AppController } from './app.contreller';
import { UserModule } from './user/user.module';




@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGO_DB_URI),
  MongooseModule.forFeature([{ name: AI_User.name, schema: AI_UserDBSchema }]
  ),
    UserModule
  ],
  controllers: [AppController],
  providers: [BotService, AppService,],
})
export class AppModule { }
