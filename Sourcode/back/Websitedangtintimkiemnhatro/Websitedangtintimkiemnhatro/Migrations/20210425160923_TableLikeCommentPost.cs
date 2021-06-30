using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class TableLikeCommentPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPosts_Comments_CommentId",
                table: "LikeCommentPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_LikeCommentPosts_Posts_PostId",
                table: "LikeCommentPosts");

            migrationBuilder.DropIndex(
                name: "IX_LikeCommentPosts_CommentId",
                table: "LikeCommentPosts");

            migrationBuilder.DropIndex(
                name: "IX_LikeCommentPosts_PostId",
                table: "LikeCommentPosts");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "LikeCommentPosts");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "LikeCommentPosts");

            migrationBuilder.AddColumn<int>(
                name: "IdCommnent",
                table: "LikeCommentPosts",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdPost",
                table: "LikeCommentPosts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCommnent",
                table: "LikeCommentPosts");

            migrationBuilder.DropColumn(
                name: "IdPost",
                table: "LikeCommentPosts");

            migrationBuilder.AddColumn<int>(
                name: "CommentId",
                table: "LikeCommentPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "LikeCommentPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_LikeCommentPosts_CommentId",
                table: "LikeCommentPosts",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeCommentPosts_PostId",
                table: "LikeCommentPosts",
                column: "PostId");

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
        }
    }
}
