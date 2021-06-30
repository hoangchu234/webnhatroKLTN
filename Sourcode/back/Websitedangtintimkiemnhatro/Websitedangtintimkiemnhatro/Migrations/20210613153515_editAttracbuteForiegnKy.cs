using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class editAttracbuteForiegnKy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConversationId",
                table: "Notifications",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ConversationId",
                table: "Notifications",
                column: "ConversationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Conversations_ConversationId",
                table: "Notifications",
                column: "ConversationId",
                principalTable: "Conversations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Conversations_ConversationId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ConversationId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ConversationId",
                table: "Notifications");
        }
    }
}
