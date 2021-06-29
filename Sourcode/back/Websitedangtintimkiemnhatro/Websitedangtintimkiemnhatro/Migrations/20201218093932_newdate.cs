using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Money",
                table: "Accounts");

            migrationBuilder.AddColumn<string>(
                name: "IsHD",
                table: "Accounts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHD",
                table: "Accounts");

            migrationBuilder.AddColumn<float>(
                name: "Money",
                table: "Accounts",
                type: "real",
                nullable: true);
        }
    }
}
