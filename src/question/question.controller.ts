import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res } from '@nestjs/common';
import { QuestionService } from './question.service';
import { GoFuturesQuestionsDTO } from 'src/db/questions/questions.dto';
import { Response, Request } from 'express';


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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: GoFuturesQuestionsDTO) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
