import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export enum AnswerTypeEnum {
    CHOOSE = 'choose',
    WRITE = 'write',
    TRUEORFALSE = 'trueorfalse'
}
export enum QuestionsThemeEnum {
    EXCHANGE = 'exchange',
    THEORY = 'theory',
    PSYCHOLOGY = 'psyhology',
    STRATEGY = 'strategy'
}

export class ChooseAnswers {
    @Prop({ required: true })
    answer: string;

    @Prop({ type: Boolean, required: true, default: false })
    successAnswer: boolean
}



@Schema()
export class AI_Questions {

    @Prop({ type: String, enum: AnswerTypeEnum, required: true })
    answerType: AnswerTypeEnum

    @Prop({ type: String, enum: QuestionsThemeEnum, required: true })
    questionsTheme: QuestionsThemeEnum

    @Prop({ type: String, required: true, minlength: 5 })
    question: string

    @Prop({ type: [ChooseAnswers], validate: [arrayLimit, '{PATH} exceeds the limit of 4'] })
    chooseAnswers: ChooseAnswers[]

    @Prop({ type: String, trim: true, minlength: 3 })
    writeSuccessAnswer: string | null

    @Prop({ type: Boolean })
    trueOrFalse: boolean

    @Prop({ type: Number, required: true, default: 10 })
    TTFCoins: number



}

function arrayLimit(val: ChooseAnswers[]) {
    return val.length <= 4;
}

export type AI_QuestionsSchemaType = AI_Questions & Document;
export const AI_QuestionsDBSchema = SchemaFactory.createForClass(AI_Questions)