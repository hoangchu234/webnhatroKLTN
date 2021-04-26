import { User } from '../model/User';

export class LikeCommentPost {
    id: Number;
    like: boolean;
    idPost: Number;
    idCommnent: Number;
    user: User;
    userId: Number;
}