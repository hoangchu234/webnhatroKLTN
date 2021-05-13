using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class NewData2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Details");

            migrationBuilder.AddColumn<int>(
                name: "ProvinceId",
                table: "Motels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Legal",
                table: "Details",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Motels_ProvinceId",
                table: "Motels",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Motels_Provinces_ProvinceId",
                table: "Motels",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Motels_Provinces_ProvinceId",
                table: "Motels");

            migrationBuilder.DropIndex(
                name: "IX_Motels_ProvinceId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "Legal",
                table: "Details");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Details",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
