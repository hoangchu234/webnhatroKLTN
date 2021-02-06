using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikeMotels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LikeMotels",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    MotelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeMotels", x => new { x.UserId, x.MotelId });
                    table.ForeignKey(
                        name: "FK_LikeMotels_Motels_MotelId",
                        column: x => x.MotelId,
                        principalTable: "Motels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikeMotels_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikeMotels_MotelId",
                table: "LikeMotels",
                column: "MotelId");
        }
    }
}
