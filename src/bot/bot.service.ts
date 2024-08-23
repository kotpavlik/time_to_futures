import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TelegramBot = require('node-telegram-bot-api');
import { GoFuturesUser } from 'src/db/go_futures_user';

@Injectable()
export class BotService implements OnModuleInit {
    constructor(@InjectModel(GoFuturesUser.name) private go_futures_users: Model<GoFuturesUser>) { }

    async onModuleInit() {
        this.botMessage();
    }

    async botMessage() {
        const bot = new TelegramBot(process.env.TG_BOT_TOKEN, { polling: true })

        bot.on('message', async (msg) => {
            try {
                if (msg.text == '/start' && msg.chat.id === 6399340874) {
                    console.log(msg)
                    await bot.sendMessage(msg.chat.id, `<b> Привет, ${msg.from.first_name ? msg.from.first_name : msg.from.username} 👾 </b> \n Жми <b>GO</b> 🚀 чтобы начать  или переходи по ссылке <a href='https://calc-jam-app.vercel.app/'> <b> ЗДЕСЬ 📈 </b></a> `,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                        text: 'Play',
                                        web_app: {
                                            url: 'https://4c3d-91-149-142-24.ngrok-free.app'
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

    }
}
