using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class EditTablePriceSearchVer2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "PriceSearchs");

            migrationBuilder.AddColumn<string>(
                name: "NumberOne",
                table: "PriceSearchs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumberTwo",
                table: "PriceSearchs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOne",
                table: "PriceSearchs");

            migrationBuilder.DropColumn(
                name: "NumberTwo",
                table: "PriceSearchs");

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "PriceSearchs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
