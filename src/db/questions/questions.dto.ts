import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from "class-validator";
import { AnswerTypeEnum, ChooseAnswers } from "./questions.model";

export class GoFuturesQuestionsDTO {
    @ApiProperty({ example: '235njesd78weg23', description: 'telegram user id' })
    @IsMongoId() @IsNotEmpty()
    readonly userMongoId: string

    @ApiProperty({ example: 'write', description: 'need that we understand what this questions type' })
    @IsNotEmpty() @IsString()
    answerType: AnswerTypeEnum

    @ApiProperty({ example: 'What is funding ?', description: 'question text ' })
    @IsNotEmpty() @IsString()
    question: string

    @ApiProperty({ example: { answer: 'NOT', successAnswer: true }, description: 'need for choose true answear' })
    @IsArray() @IsNotEmptyObject()
    chooseAnswers: ChooseAnswers[]

    @ApiProperty({ example: { answer: 'NOT', successAnswer: true }, description: 'user needs write answer and if answer which user wrtites mach with this answer, than answer true ' })
    @IsString()
    writeSuccessAnswer: string

    @ApiProperty({ example: true, description: 'choose true or false' })
    @IsBoolean()
    trueOrFalse: boolean

    @ApiProperty({ example: false, description: 'success question or no' })
    @IsBoolean()
    verified: boolean

    @ApiProperty({ example: 150, description: 'coins which you get if you right' })
    @IsNumber() @IsNotEmpty()
    TTFCoins: number

}

