using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class TableReportPostver2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "ReportPosts");

            migrationBuilder.AddColumn<string>(
                name: "Report",
                table: "ReportPosts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Write",
                table: "ReportPosts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Report",
                table: "ReportPosts");

            migrationBuilder.DropColumn(
                name: "Write",
                table: "ReportPosts");

            migrationBuilder.AddColumn<float>(
                name: "Count",
                table: "ReportPosts",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
