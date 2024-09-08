import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



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

    @Prop({ type: Boolean, required: true })
    isPremium: boolean

    @Prop({ type: Number, default: 0 })
    TTFUserCoins: number

    @Prop({ type: Number, default: 0 })
    TTFEarnedUserCoins: number

    @Prop({ type: Number, default: 1 })
    LVL: number

    @Prop({ type: Number, default: 0 })
    successQuestion: number

    @Prop({ type: String, required: true })
    my_referal_link: string

    @Prop({ type: Number })
    my_referer: number

    @Prop({ type: String })
    wallet_addres: string

    @Prop({ type: String, required: true })
    authDate: string

}

export type AI_UserSchemaType = AI_User & Document;
export const AI_UserDBSchema = SchemaFactory.createForClass(AI_User)