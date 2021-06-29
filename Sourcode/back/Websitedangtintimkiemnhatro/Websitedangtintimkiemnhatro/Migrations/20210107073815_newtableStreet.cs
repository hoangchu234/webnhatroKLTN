using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newtableStreet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StreetId",
                table: "Motels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Streets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ProvinceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Streets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Streets_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Motels_StreetId",
                table: "Motels",
                column: "StreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Streets_ProvinceId",
                table: "Streets",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Motels_Streets_StreetId",
                table: "Motels",
                column: "StreetId",
                principalTable: "Streets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Motels_Streets_StreetId",
                table: "Motels");

            migrationBuilder.DropTable(
                name: "Streets");

            migrationBuilder.DropIndex(
                name: "IX_Motels_StreetId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "StreetId",
                table: "Motels");
        }
    }
}
