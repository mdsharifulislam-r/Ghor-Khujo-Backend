import { Response } from 'express';
export declare class MailService {
    private transpoter;
    constructor();
    sendMail(email: string, id: string, res: Response, from?: string): Promise<Response<any, Record<string, any>> | {
        statusCode: number;
        message: string[];
    }>;
    sendMailClient(email: string, name: string, res: Response, message: string, from?: string): Promise<Response<any, Record<string, any>> | {
        statusCode: number;
        message: string[];
    }>;
}
