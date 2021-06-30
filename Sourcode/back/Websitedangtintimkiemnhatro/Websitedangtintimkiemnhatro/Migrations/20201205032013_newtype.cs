using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newtype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Motels_Types_TypeId",
                table: "Motels");

            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropIndex(
                name: "IX_Motels_TypeId",
                table: "Motels");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Motels");

            migrationBuilder.AddColumn<int>(
                name: "Date",
                table: "Serviceprices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Typeservice",
                table: "Motels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Serviceprices");

            migrationBuilder.DropColumn(
                name: "Typeservice",
                table: "Motels");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Motels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<float>(type: "real", nullable: false)
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

            migrationBuilder.AddForeignKey(
                name: "FK_Motels_Types_TypeId",
                table: "Motels",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
