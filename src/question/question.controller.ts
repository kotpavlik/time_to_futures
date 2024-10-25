import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res, Put, HttpStatus } from '@nestjs/common';
import { QuestionService } from './question.service';
import { GoFuturesQuestionsDTO } from 'src/db/questions/questions.dto';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  async create(@Body() createQuestionDto: GoFuturesQuestionsDTO, @Res() res: Response) {
    try {
      const newQuestion = await this.questionService.create(createQuestionDto)
      return res.status(201).json(newQuestion)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }


  @Get()
  async getAllQuestions(@Res() res: Response) {
    try {
      const AllQuestions = await this.questionService.findAll()
      return res.status(201).json(AllQuestions)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }

  @Put()
  @ApiOperation({ summary: 'update question' })
  @ApiResponse({ status: HttpStatus.CREATED, type: GoFuturesQuestionsDTO })
  async updateQuestion(@Body() body: { update_data: GoFuturesQuestionsDTO, id: string }, @Res() res: Response) {
    try {
      const newQuestion = await this.questionService.update(body.id, body.update_data)
      return res.status(201).json(newQuestion)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
