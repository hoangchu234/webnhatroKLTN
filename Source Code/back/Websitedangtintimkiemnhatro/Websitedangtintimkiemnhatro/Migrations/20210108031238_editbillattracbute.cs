using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class editbillattracbute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Motels_MotelId",
                table: "Bills");

            migrationBuilder.DropIndex(
                name: "IX_Bills_MotelId",
                table: "Bills");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_MotelId",
                table: "Bills",
                column: "MotelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Motels_MotelId",
                table: "Bills",
                column: "MotelId",
                principalTable: "Motels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Motels_MotelId",
                table: "Bills");

            migrationBuilder.DropIndex(
                name: "IX_Bills_MotelId",
                table: "Bills");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_MotelId",
                table: "Bills",
                column: "MotelId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Motels_MotelId",
                table: "Bills",
                column: "MotelId",
                principalTable: "Motels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
