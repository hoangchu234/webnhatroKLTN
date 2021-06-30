using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class editpericeandarea : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AreaZoneType",
                table: "Motels",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PriceType",
                table: "Motels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AreaZoneType",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "PriceType",
                table: "Motels");
        }
    }
}
