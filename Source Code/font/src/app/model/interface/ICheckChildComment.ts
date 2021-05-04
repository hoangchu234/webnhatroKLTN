export interface ICheckChildComment{
  idComment: number;
  idParent: number;
  checkChildComment:boolean;
}
export interface IListCheckParentComment{
  idPost:number;
  checkParentComment:boolean;
  childCommentCheck:ICheckChildComment[];
}