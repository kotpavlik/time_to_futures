import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TelegramBot = require('node-telegram-bot-api');
import { AI_User } from 'src/db/user/user.model';

@Injectable()
export class BotService implements OnModuleInit {
    constructor(@InjectModel(AI_User.name) private AI_UserBD: Model<AI_User>) { }

    async onModuleInit() {
        this.botMessage();
    }

    async botMessage() {
        const bot = new TelegramBot(process.env.TG_BOT_TOKEN, { polling: true })

        bot.on('message', async (msg) => {
            try {
                if (msg.text == '/start') {

                    await bot.sendMessage(msg.chat.id, `<b> Привет, ${msg.from.first_name ? msg.from.first_name : msg.from.username} 👾 </b> \n Жми <b>GO</b>  🚀 чтобы начать или жми <b>PLAY</b>`,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                        text: 'Play',
                                        web_app: {
                                            url: 'https://time-to-futures.ru.tuna.am'
                                        }
                                    }]
                                ]
                            }
                        },);
                }
            }
            catch (error) {

                console.log(error);


            }
        })

        //         bot.on('inline_query' async (msg) => {
        //             try {
        // await bot.
        //             } catch (error) {

        //             }
        //         })
    }
}
