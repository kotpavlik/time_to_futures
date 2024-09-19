import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GoFuturesUserDTO {
    @ApiProperty({ example: 6399340874, description: 'telegram user id' })
    @IsNumber() @IsNotEmpty()
    readonly userId: number

    @ApiProperty({ example: 'Ivan', description: 'telegram user first_name' })
    @IsString()
    readonly firstName: string

    @ApiProperty({ example: 'Ivanov', description: 'telegram user last_name' })
    @IsString()
    readonly lastName: string

    @ApiProperty({ example: 'PussyHunter', description: 'telegram user user_name' })
    @IsString() @IsNotEmpty()
    readonly userName: string

    @ApiProperty({ example: true, description: 'check telegram premium' })
    @IsBoolean() @IsNotEmpty()
    readonly isPremium: boolean

    @ApiProperty({ example: 20304056, description: 'spent coins' })
    @IsNumber() @IsNotEmpty()
    readonly TTFSpentUserCoins: number

    @ApiProperty({ example: 20304056, description: 'cearned coins' })
    @IsNumber() @IsNotEmpty()
    readonly TTFEarnedUserCoins: number

    @ApiProperty({ example: Number, description: 'lvl of the user' })
    @IsNumber() @IsNotEmpty()
    readonly LVL: number

    @ApiProperty({ example: 500, description: 'success questions' })
    @IsNumber() @IsNotEmpty()
    readonly successQuestion: number

    @ApiProperty({ example: 'https://t.me/go_to_futures?opendapp=23526536463', description: 'my referal link' })
    @IsString()
    readonly my_referal_link: string

    @ApiProperty({ example: 123414125, description: 'person who invite you' })
    @IsNumber() @IsNotEmpty()
    readonly my_referer: number

    @ApiProperty({ example: 'qwDwe_2323fsdasfr_sdbfret', description: 'telegram wallet address' })
    @IsString()
    readonly wallet_addres: string

    @ApiProperty({ example: '12312424654745234145', description: 'auth date' })
    @IsString() @IsNotEmpty()
    readonly authDate: string

}

export class UsersCoinsDTO {


    @ApiProperty({ example: 20304056, description: 'earned coins' })
    @IsNumber() @IsNotEmpty()
    readonly coins: number

    @ApiProperty({ example: 6399340874, description: 'telegram user id' })
    @IsNumber() @IsNotEmpty()
    readonly userId: number
}