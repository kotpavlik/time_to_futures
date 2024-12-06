import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotService } from 'src/bot/bot.service';
import { GoFuturesUserDTO, UserReferalsDTO, UsersCoinsDTO, UsersLvLDTO } from 'src/db/user/user.dto';
import { AI_User } from 'src/db/user/user.model';

@Injectable()
export class UserService {
    private readonly BotService: BotService
    constructor(
        @InjectModel(AI_User.name) private AI_UserBD: Model<AI_User>
    ) { }

    async CheckUser(userData: GoFuturesUserDTO) {
        const UserData: GoFuturesUserDTO = await this.AI_UserBD.findOne({ userId: userData.userId })
        if (UserData === null) {

            if (userData.userId === userData.my_ref_invite_id) {
                userData = {
                    ...userData,
                    my_ref_invite_id: null,
                };
                const createUser = await this.AI_UserBD.create(userData)
                return createUser
            } else {
                const createUser = await this.AI_UserBD.create(userData)
                return createUser
            }

        } else {
            return UserData
        }
    }

    async GetReferals(user_data_id: UserReferalsDTO) {
        const { userId } = user_data_id
        console.log(userId)
        if (userId) {
            const Referals = await this.AI_UserBD.find({ my_ref_invite_id: userId })
            return Referals
        }
    }

    async UpdateCoins(coins_data: UsersCoinsDTO) {
        const UserData = await this.AI_UserBD.findOne({ userId: coins_data.userId })
        if (UserData === null) {
            throw new HttpException('something wrong', HttpStatus.BAD_REQUEST)
        }

        if (coins_data.coins < 0) {
            const NotEnoughMoney = UserData.TTFEarnedUserCoins + UserData.TTFSpentUserCoins + coins_data.coins
            if (NotEnoughMoney < 0) {
                throw new HttpException('not enough money', HttpStatus.BAD_REQUEST)
            }
        }

        if (coins_data.coins > 0) {
            const newEarnedCoins = UserData.TTFEarnedUserCoins + coins_data.coins
            const newUserData = await this.AI_UserBD.findOneAndUpdate({ userId: coins_data.userId }, { TTFEarnedUserCoins: newEarnedCoins }, { new: true })
            return newUserData
        }

        if (coins_data.coins < 0) {
            const newSpentdCoins = UserData.TTFSpentUserCoins + coins_data.coins
            const newUserData = await this.AI_UserBD.findOneAndUpdate({ userId: coins_data.userId }, { TTFSpentUserCoins: newSpentdCoins }, { new: true })
            return newUserData
        }

    }
    async UpdateLvL(lvl_data: UsersLvLDTO) {
        const UserData = await this.AI_UserBD.findOne({ userId: lvl_data.userId })
        if (UserData === null) {
            throw new HttpException('something wrong', HttpStatus.BAD_REQUEST)
        }

        if (UserData.LVL > lvl_data.lvl) {
            return UserData
        }
        const newUserData = await this.AI_UserBD.findOneAndUpdate({ userId: lvl_data.userId }, { LVL: lvl_data.lvl }, { new: true })
        return newUserData
    }
}
