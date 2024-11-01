import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Mexc from 'mexc-api-sdk';

@Injectable()
export class MexcService implements OnModuleInit {
    private client: Mexc.UserData;

    constructor() {
        const apiKey = 'apikey';
        const apiSecret = 'apiSecret';
        this.client = new Mexc.UserData(apiKey, apiSecret);
    }

    async onModuleInit() {
        this.getAccountInfo();
    }


    async getAccountInfo() {
        try {

            console.log(this.client)


        } catch (error) {
            throw new Error(`Failed to fetch account info: ${error.message}`);
        }
    }

    // Другие методы для работы с Mexc API можно добавить здесь
}