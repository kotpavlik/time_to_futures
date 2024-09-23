import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export enum AnswerType {
    CHOOSE = 'choose',
    WRITE = 'write'
}

export class ChooseAnswers {
    @Prop({ required: true })
    answer: string;

    @Prop({ type: Boolean, required: true, default: false })
    successAnswer: boolean
}



@Schema()
export class AI_Questions {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userMongoId: Types.ObjectId;

    @Prop({ type: String, enum: AnswerType, required: true })
    answerType: AnswerType

    @Prop({ type: String, required: true, minlength: 5, trim: true })
    question: string

    @Prop({ type: [ChooseAnswers], validate: [arrayLimit, '{PATH} exceeds the limit of 4'] })
    chooseAnswers: ChooseAnswers[]

    @Prop({ type: String, trim: true, minlength: 1 })
    writeSuccessAnswer: string | null



}

function arrayLimit(val: ChooseAnswers[]) {
    return val.length <= 4;
}

export type AI_QuestionsSchemaType = AI_Questions & Document;
export const AI_QuestionsDBSchema = SchemaFactory.createForClass(AI_Questions)