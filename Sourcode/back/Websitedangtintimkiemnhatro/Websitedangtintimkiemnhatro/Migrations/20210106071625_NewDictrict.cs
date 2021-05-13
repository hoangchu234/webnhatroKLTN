using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class NewDictrict : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DistrictId",
                table: "Motels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Motels_DistrictId",
                table: "Motels",
                column: "DistrictId");

            migrationBuilder.AddForeignKey(
                name: "FK_Motels_Districts_DistrictId",
                table: "Motels",
                column: "DistrictId",
                principalTable: "Districts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Motels_Districts_DistrictId",
                table: "Motels");

            migrationBuilder.DropIndex(
                name: "IX_Motels_DistrictId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "Motels");
        }
    }
}
