import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TelegramBot = require('node-telegram-bot-api');
import { AI_User } from 'src/db/user/user.model';

@Injectable()
export class BotService implements OnModuleInit {
    private bot: TelegramBot; // Делаем bot свойством класса

    constructor(@InjectModel(AI_User.name) private AI_UserBD: Model<AI_User>) { }

    async onModuleInit() {
        this.bot = new TelegramBot(process.env.TG_BOT_TOKEN, { polling: true }); // Инициализируем bot
        this.botMessage(); // Запускаем обработку сообщений
    }

    async botMessage() {
        this.bot.on('message', async (msg) => {
            try {
                if (msg.text == '/start') {
                    await this.bot.sendMessage(
                        msg.chat.id,
                        `<b> Привет, ${msg.from.first_name ? msg.from.first_name : msg.from.username} 👾 </b> \n Жми <b>GO</b>  🚀 чтобы начать или жми <b>PLAY</b>`,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'Play',
                                            web_app: {
                                                url: 'https://time-to-futures-tma.vercel.app',
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                    );
                }
                if (msg.text == '/dev') {
                    await this.bot.sendMessage(
                        msg.chat.id,
                        `<b>Режим разработки</b> \n Нажмите <b>DEV</b> ниже, чтобы открыть локальный сервер.`,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'DEV',
                                            web_app: {
                                                url: 'https://time-to-futures.ru.tuna.am',
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                    );
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    async sendWelcomeMessage(userId: number, refParam: string) {
        try {
            await this.bot.sendMessage(
                userId,
                `<b>Привет! 👾</b> \n Вы перешли по реферальной ссылке: ${refParam}. Добро пожаловать в наше сообщество! 🚀`,
                {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                },
            );
        } catch (error) {
            console.error('Ошибка при отправке приветственного сообщения:', error);
        }
    }
}