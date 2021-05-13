using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class EditTablePriceSearchVer5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypePrice",
                table: "PriceSearchs");

            migrationBuilder.AddColumn<string>(
                name: "TypePriceOne",
                table: "PriceSearchs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypePriceTwo",
                table: "PriceSearchs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypePriceOne",
                table: "PriceSearchs");

            migrationBuilder.DropColumn(
                name: "TypePriceTwo",
                table: "PriceSearchs");

            migrationBuilder.AddColumn<string>(
                name: "TypePrice",
                table: "PriceSearchs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
