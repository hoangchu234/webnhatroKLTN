using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class EditName2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdNew",
                table: "Motels");

            migrationBuilder.AddColumn<string>(
                name: "TypeLive",
                table: "Motels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeLive",
                table: "Motels");

            migrationBuilder.AddColumn<string>(
                name: "IdNew",
                table: "Motels",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
