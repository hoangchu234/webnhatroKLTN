using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newdate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LiveTypeId",
                table: "Details",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "LiveTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiveTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Details_LiveTypeId",
                table: "Details",
                column: "LiveTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Details_LiveTypes_LiveTypeId",
                table: "Details",
                column: "LiveTypeId",
                principalTable: "LiveTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_LiveTypes_LiveTypeId",
                table: "Details");

            migrationBuilder.DropTable(
                name: "LiveTypes");

            migrationBuilder.DropIndex(
                name: "IX_Details_LiveTypeId",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "LiveTypeId",
                table: "Details");
        }
    }
}
