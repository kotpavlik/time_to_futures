import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AI_Questions, AI_QuestionsDBSchema } from 'src/db/questions/questions.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: AI_Questions.name, schema: AI_QuestionsDBSchema }])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule { }
