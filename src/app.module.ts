import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GoFuturesUser, GoFuturesUserDBSchema } from './db/go_futures_user';
import { BotService } from './bot/bot.service';
import { AppController } from './app.contreller';




@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGO_DB_URI),
  MongooseModule.forFeature([{ name: GoFuturesUser.name, schema: GoFuturesUserDBSchema }]
  )
  ],
  controllers: [AppController],
  providers: [BotService, AppService,],
})
export class AppModule { }
