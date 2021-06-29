using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class editmotelverify : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VerifyAdmin",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "VerifyUser",
                table: "Motels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "VerifyAdmin",
                table: "Motels",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "VerifyUser",
                table: "Motels",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
