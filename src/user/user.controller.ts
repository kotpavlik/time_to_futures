import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoFuturesUserDTO, UsersCoinsDTO, UsersLvLDTO } from 'src/db/user/user.dto';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('check_user')
  @ApiOperation({ summary: 'initial user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: GoFuturesUserDTO })

  async createNewAI_User(@Body() dto: GoFuturesUserDTO, @Res() res: Response) {
    try {
      const AI_User = await this.userService.CheckUser(dto)
      return res.cookie("user", AI_User, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true
      }).status(201).json(AI_User)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }


  @Put('update_coins')
  @ApiOperation({ summary: 'update coins' })
  @ApiResponse({ status: HttpStatus.CREATED, type: GoFuturesUserDTO })

  async updateUserCoins(@Body() coins_data: UsersCoinsDTO, @Res() res: Response) {
    try {
      const AI_User = await this.userService.UpdateCoins(coins_data)
      return res.cookie("user", AI_User, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true
      }).status(201).json(AI_User)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }

  @Put('update_lvl')
  @ApiOperation({ summary: 'update user lvl' })
  @ApiResponse({ status: HttpStatus.CREATED, type: GoFuturesUserDTO })

  async updateUserLvL(@Body() lvl_data: UsersLvLDTO, @Res() res: Response) {
    try {
      const AI_User = await this.userService.UpdateLvL(lvl_data)
      return res.cookie("user", AI_User, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true
      }).status(201).json(AI_User)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }

}






