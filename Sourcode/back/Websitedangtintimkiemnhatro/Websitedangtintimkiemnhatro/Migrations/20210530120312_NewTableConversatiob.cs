using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class NewTableConversatiob : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Clientuniqueid",
                table: "Messegers");

            migrationBuilder.AddColumn<int>(
                name: "ConversationId",
                table: "Messegers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Messegers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Conversations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserIdOne = table.Column<int>(nullable: false),
                    UserIdTwo = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messegers_ConversationId",
                table: "Messegers",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Messegers_UserId",
                table: "Messegers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messegers_Conversations_ConversationId",
                table: "Messegers",
                column: "ConversationId",
                principalTable: "Conversations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Messegers_Users_UserId",
                table: "Messegers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messegers_Conversations_ConversationId",
                table: "Messegers");

            migrationBuilder.DropForeignKey(
                name: "FK_Messegers_Users_UserId",
                table: "Messegers");

            migrationBuilder.DropTable(
                name: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Messegers_ConversationId",
                table: "Messegers");

            migrationBuilder.DropIndex(
                name: "IX_Messegers_UserId",
                table: "Messegers");

            migrationBuilder.DropColumn(
                name: "ConversationId",
                table: "Messegers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Messegers");

            migrationBuilder.AddColumn<string>(
                name: "Clientuniqueid",
                table: "Messegers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
