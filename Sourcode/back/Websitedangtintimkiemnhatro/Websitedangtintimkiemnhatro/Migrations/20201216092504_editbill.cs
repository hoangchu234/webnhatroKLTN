using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class editbill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Serviceprices_SevicepriceId",
                table: "Bills");

            migrationBuilder.DropIndex(
                name: "IX_Bills_SevicepriceId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "SevicepriceId",
                table: "Bills");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SevicepriceId",
                table: "Bills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bills_SevicepriceId",
                table: "Bills",
                column: "SevicepriceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Serviceprices_SevicepriceId",
                table: "Bills",
                column: "SevicepriceId",
                principalTable: "Serviceprices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
