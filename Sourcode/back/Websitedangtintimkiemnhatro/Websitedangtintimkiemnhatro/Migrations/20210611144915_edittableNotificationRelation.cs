using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class edittableNotificationRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Messegers_MessegerId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_MessegerId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "MessegerId",
                table: "Notifications");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MessegerId",
                table: "Notifications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_MessegerId",
                table: "Notifications",
                column: "MessegerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Messegers_MessegerId",
                table: "Notifications",
                column: "MessegerId",
                principalTable: "Messegers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
