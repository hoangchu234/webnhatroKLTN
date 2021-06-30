using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class edittableNotificationeditattribuate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JustSee",
                table: "Notifications");

            migrationBuilder.AddColumn<int>(
                name: "UserSender",
                table: "Notifications",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserSender",
                table: "Notifications");

            migrationBuilder.AddColumn<bool>(
                name: "JustSee",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
