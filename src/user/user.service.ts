import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotService } from 'src/bot/bot.service';
import { GoFuturesUserDTO } from 'src/db/user/user.dto';
import { AI_User } from 'src/db/user/user.model';

@Injectable()
export class UserService {
    private readonly BotService: BotService
    constructor(
        @InjectModel(AI_User.name) private AI_UserBD: Model<AI_User>
    ) { }

    async CheckUser(userData: GoFuturesUserDTO) {
        const UserData = await this.AI_UserBD.findOne({ userId: userData.userId })
        if (UserData === null) {
            const createUser = await this.AI_UserBD.create({ ...userData, TTFEarnedUserCoins: 200 })
            return createUser
        } else {
            return UserData
        }
    }


}
