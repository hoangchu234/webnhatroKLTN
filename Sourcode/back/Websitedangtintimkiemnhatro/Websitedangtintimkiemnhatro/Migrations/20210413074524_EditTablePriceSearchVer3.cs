using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class EditTablePriceSearchVer3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToLower",
                table: "PriceSearchs");

            migrationBuilder.AddColumn<string>(
                name: "Another",
                table: "PriceSearchs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Another",
                table: "PriceSearchs");

            migrationBuilder.AddColumn<bool>(
                name: "ToLower",
                table: "PriceSearchs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
