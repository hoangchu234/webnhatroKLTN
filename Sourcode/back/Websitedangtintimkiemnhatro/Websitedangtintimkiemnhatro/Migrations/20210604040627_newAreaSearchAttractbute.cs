using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newAreaSearchAttractbute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "AreaSearchs");

            migrationBuilder.AddColumn<string>(
                name: "NumberOne",
                table: "AreaSearchs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumberTwo",
                table: "AreaSearchs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "AreaSearchs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOne",
                table: "AreaSearchs");

            migrationBuilder.DropColumn(
                name: "NumberTwo",
                table: "AreaSearchs");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "AreaSearchs");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AreaSearchs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
