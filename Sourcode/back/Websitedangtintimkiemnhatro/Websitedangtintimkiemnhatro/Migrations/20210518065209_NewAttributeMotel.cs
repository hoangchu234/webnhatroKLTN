using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class NewAttributeMotel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Latitude",
                table: "Motels",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Longitude",
                table: "Motels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Motels");
        }
    }
}
