using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class newTableNotificationver2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserReceiver = table.Column<int>(nullable: false),
                    MessegerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Messegers_MessegerId",
                        column: x => x.MessegerId,
                        principalTable: "Messegers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_MessegerId",
                table: "Notifications",
                column: "MessegerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");
        }
    }
}
