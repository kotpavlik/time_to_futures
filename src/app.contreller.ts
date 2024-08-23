import { BotService } from './bot/bot.service';
import { AppService } from './app.service';
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    constructor(private readonly AppService: AppService, private readonly botService: BotService) { }

    @Get()
    async SayHello() {
        return this.AppService.getHello()
    }



}