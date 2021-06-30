using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newDataIntTableMesseger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "JustSee",
                table: "Messegers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JustSee",
                table: "Messegers");
        }
    }
}
