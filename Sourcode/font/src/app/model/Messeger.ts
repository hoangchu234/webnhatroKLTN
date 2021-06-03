import { User } from '../model/User';

export class Messeger {
    id: string;
    type: string;
    message: string;
    date: Date;
    userId: number;
    conversationId: number;
}