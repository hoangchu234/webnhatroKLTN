using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class deleteAttractDetial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Directormain",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "Legal",
                table: "Details");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Directormain",
                table: "Details",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Legal",
                table: "Details",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
