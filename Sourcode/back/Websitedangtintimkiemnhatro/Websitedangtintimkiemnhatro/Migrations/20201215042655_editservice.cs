using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class editservice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Serviceprices");

            migrationBuilder.AlterColumn<string>(
                name: "Date",
                table: "Serviceprices",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "PriceDate",
                table: "Serviceprices",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PriceMonth",
                table: "Serviceprices",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PriceUpTop",
                table: "Serviceprices",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PriceWeek",
                table: "Serviceprices",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceDate",
                table: "Serviceprices");

            migrationBuilder.DropColumn(
                name: "PriceMonth",
                table: "Serviceprices");

            migrationBuilder.DropColumn(
                name: "PriceUpTop",
                table: "Serviceprices");

            migrationBuilder.DropColumn(
                name: "PriceWeek",
                table: "Serviceprices");

            migrationBuilder.AlterColumn<int>(
                name: "Date",
                table: "Serviceprices",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "Serviceprices",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
