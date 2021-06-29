using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class edittablenotificationsee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewMessage",
                table: "Notifications");

            migrationBuilder.AddColumn<bool>(
                name: "SeeReceiver",
                table: "Notifications",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "SeeSender",
                table: "Notifications",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeeReceiver",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "SeeSender",
                table: "Notifications");

            migrationBuilder.AddColumn<bool>(
                name: "NewMessage",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
