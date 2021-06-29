using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class LikePostCommentTablever2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPost_Comments_CommentId",
                table: "LikeCommentPost");

            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPost_Posts_PostId",
                table: "LikeCommentPost");

            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPost_Users_UserId",
                table: "LikeCommentPost");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LikeCommentPost",
                table: "LikeCommentPost");

            migrationBuilder.RenameTable(
                name: "LikeCommentPost",
                newName: "LikeCommentPosts");

            migrationBuilder.RenameIndex(
                name: "IX_LikeCommentPost_UserId",
                table: "LikeCommentPosts",
                newName: "IX_LikeCommentPosts_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_LikeCommentPost_PostId",
                table: "LikeCommentPosts",
                newName: "IX_LikeCommentPosts_PostId");

            migrationBuilder.RenameIndex(
                name: "IX_LikeCommentPost_CommentId",
                table: "LikeCommentPosts",
                newName: "IX_LikeCommentPosts_CommentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikeCommentPosts",
                table: "LikeCommentPosts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LikeCommentPosts_Comments_CommentId",
                table: "LikeCommentPosts",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LikeCommentPosts_Posts_PostId",
                table: "LikeCommentPosts",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LikeCommentPosts_Users_UserId",
                table: "LikeCommentPosts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPosts_Comments_CommentId",
                table: "LikeCommentPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPosts_Posts_PostId",
                table: "LikeCommentPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPosts_Users_UserId",
                table: "LikeCommentPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LikeCommentPosts",
                table: "LikeCommentPosts");

            migrationBuilder.RenameTable(
                name: "LikeCommentPosts",
                newName: "LikeCommentPost");

            migrationBuilder.RenameIndex(
                name: "IX_LikeCommentPosts_UserId",
                table: "LikeCommentPost",
                newName: "IX_LikeCommentPost_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_LikeCommentPosts_PostId",
                table: "LikeCommentPost",
                newName: "IX_LikeCommentPost_PostId");

            migrationBuilder.RenameIndex(
                name: "IX_LikeCommentPosts_CommentId",
                table: "LikeCommentPost",
                newName: "IX_LikeCommentPost_CommentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LikeCommentPost",
                table: "LikeCommentPost",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LikeCommentPost_Comments_CommentId",
                table: "LikeCommentPost",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LikeCommentPost_Posts_PostId",
                table: "LikeCommentPost",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LikeCommentPost_Users_UserId",
                table: "LikeCommentPost",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
