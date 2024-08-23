import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";




@Schema()
export class GoFuturesUser {

    @Prop({ required: true })
    date: string

    @Prop({ required: true })
    firstName: string

    @Prop({ required: true })
    lastName: string

    @Prop({ required: true })
    password: string

    @Prop({ default: null })
    avatar: string

    @Prop({ default: null })
    avatarId: string

}

export type GoFuturesUserSchemaType = GoFuturesUser & Document;


export const GoFuturesUserDBSchema = SchemaFactory.createForClass(GoFuturesUser)