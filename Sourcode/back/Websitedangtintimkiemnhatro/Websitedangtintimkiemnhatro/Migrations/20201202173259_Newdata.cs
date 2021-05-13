using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class Newdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Motels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Typemotel",
                table: "Motels",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Director",
                table: "Details",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Directormain",
                table: "Details",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Details",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Typelive",
                table: "Details",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Districts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ProvinceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Districts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Districts_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    Date = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Motels_TypeId",
                table: "Motels",
                column: "TypeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Districts_ProvinceId",
                table: "Districts",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Motels_Types_TypeId",
                table: "Motels",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Motels_Types_TypeId",
                table: "Motels");

            migrationBuilder.DropTable(
                name: "Districts");

            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropIndex(
                name: "IX_Motels_TypeId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "Typemotel",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "Director",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "Directormain",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "Typelive",
                table: "Details");
        }
    }
}
