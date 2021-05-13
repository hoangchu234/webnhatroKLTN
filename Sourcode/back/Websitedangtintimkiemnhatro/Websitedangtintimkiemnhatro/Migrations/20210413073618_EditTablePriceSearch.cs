using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class EditTablePriceSearch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ToLower",
                table: "PriceSearchs",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TypePrice",
                table: "PriceSearchs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToLower",
                table: "PriceSearchs");

            migrationBuilder.DropColumn(
                name: "TypePrice",
                table: "PriceSearchs");
        }
    }
}
