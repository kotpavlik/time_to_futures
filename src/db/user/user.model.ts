import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";



@Schema()
export class AI_User {

    @Prop({ type: Number, unique: true, required: true })
    userId: number

    @Prop({ type: String })
    firstName: string

    @Prop({ type: String })
    lastName: string

    @Prop({ type: String, required: true })
    userName: string

    @Prop({ type: Boolean })
    isPremium: boolean

    @Prop({ type: Number, default: 0 })
    TTFSpentUserCoins: number

    @Prop({ type: Number, default: 0 })
    TTFEarnedUserCoins: number

    @Prop({ type: Number, default: 1 })
    LVL: number

    @Prop({ type: Number, default: 0 })
    successQuestion: number

    @Prop({ type: String, required: true })
    my_referal_link: string

    @Prop({ type: Number })
    my_ref_invite_id: number

    @Prop({ type: String })
    wallet_addres: string

    @Prop({ type: String, required: true })
    authDate: string

    @Prop({ type: [Types.ObjectId], ref: 'AI_Questions', default: [] })
    correctAnswers: Types.ObjectId[];

}

export type AI_UserSchemaType = AI_User & Document;
export const AI_UserDBSchema = SchemaFactory.createForClass(AI_User)