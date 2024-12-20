import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotService } from 'src/bot/bot.service';
import { GoFuturesQuestionsDTO } from 'src/db/questions/questions.dto';
import { AI_Questions } from 'src/db/questions/questions.model';


@Injectable()
export class QuestionService {
  private readonly BotService: BotService
  constructor(
    @InjectModel(AI_Questions.name) private AI_QuestionsBD: Model<AI_Questions>
  ) { }



  async create(createQuestionDto: GoFuturesQuestionsDTO) {
    if (createQuestionDto) {
      const newQuestion = await this.AI_QuestionsBD.create(createQuestionDto)
      return newQuestion
    }
    throw new HttpException('something wrong', HttpStatus.BAD_REQUEST)
  }

  async findAll() {
    const AllQoestions = await this.AI_QuestionsBD.find()
    if (AllQoestions && AllQoestions.length > 0) {
      return AllQoestions
    }
    throw new HttpException('Amm ... where questions?', HttpStatus.BAD_GATEWAY)
  }

  async update(id: string, update_data: GoFuturesQuestionsDTO) {
    const find_question = await this.AI_QuestionsBD.findOne({ _id: id })

    if (find_question) {
      const new_question = await this.AI_QuestionsBD.findOneAndUpdate({ _id: id }, { ...update_data }, { new: true })
      return new_question
    }
    return find_question
  }

  async(id: number) {
    return `This action returns a #${id} question`;
  }



  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
