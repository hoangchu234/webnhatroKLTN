using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class Edit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Motels_Details_DetailId",
                table: "Motels");

            migrationBuilder.DropIndex(
                name: "IX_Motels_DetailId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "DetailId",
                table: "Motels");

            migrationBuilder.AddColumn<int>(
                name: "MotelId",
                table: "Details",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Details_MotelId",
                table: "Details",
                column: "MotelId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Details_Motels_MotelId",
                table: "Details",
                column: "MotelId",
                principalTable: "Motels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_Motels_MotelId",
                table: "Details");

            migrationBuilder.DropIndex(
                name: "IX_Details_MotelId",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "MotelId",
                table: "Details");

            migrationBuilder.AddColumn<int>(
                name: "DetailId",
                table: "Motels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Motels_DetailId",
                table: "Motels",
                column: "DetailId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Motels_Details_DetailId",
                table: "Motels",
                column: "DetailId",
                principalTable: "Details",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
