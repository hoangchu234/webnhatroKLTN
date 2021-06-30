using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class edittableNotificationnew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "NewMessage",
                table: "Notifications",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewMessage",
                table: "Notifications");
        }
    }
}
