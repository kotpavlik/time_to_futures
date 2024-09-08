import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoFuturesUserDTO } from 'src/db/user/user.dto';
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
}
