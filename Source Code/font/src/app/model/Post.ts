import { User } from './User';
import { Comment } from './Comment';

export class Post {
    id: string;
    postUser: string;
    createDate:Date;
    user:User;
    userId:string;
    comment:Comment;
    comments:Comment[];
}
