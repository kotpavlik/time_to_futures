import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AnswerType, ChooseAnswers } from "./questions.model";

export class GoFuturesQuestionsDTO {
    @ApiProperty({ example: '235njesd78weg23', description: 'telegram user id' })
    @IsMongoId() @IsNotEmpty()
    readonly userMongoId: string

    @ApiProperty({ example: 'write', description: 'need that we understand what this questions type' })
    @IsNotEmpty() @IsString()
    answerType: AnswerType

    @ApiProperty({ example: 'What is funding ?', description: 'question text ' })
    @IsNotEmpty() @IsString()
    question: string

    @ApiProperty({ example: { answer: 'NOT', successAnswer: true }, description: 'need for choose true answear' })
    @IsArray()
    chooseAnswers: ChooseAnswers[]

    @ApiProperty({ example: { answer: 'NOT', successAnswer: true }, description: 'user needs write answer and if answer which user wrtites mach with this answer, than answer true ' })
    @IsString()
    writeSuccessAnswer: string

}