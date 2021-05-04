using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class EditTableLikePostAndComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Like",
                table: "LikeCommentPosts");

            migrationBuilder.AddColumn<bool>(
                name: "LikeComment",
                table: "LikeCommentPosts",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LikePost",
                table: "LikeCommentPosts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LikeComment",
                table: "LikeCommentPosts");

            migrationBuilder.DropColumn(
                name: "LikePost",
                table: "LikeCommentPosts");

            migrationBuilder.AddColumn<bool>(
                name: "Like",
                table: "LikeCommentPosts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
