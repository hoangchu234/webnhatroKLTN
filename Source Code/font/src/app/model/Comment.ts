import { User } from './User';
import { Post } from './Post';

export class Comment {
    id: string;
    commentUser: string;
    createDate:Date;
    user:User;
    userId:string;
    post:Post;
    postId:string;
    parentCommentId:string;
}
