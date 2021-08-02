using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Websitedangtintimkiemnhatro.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AreaSearchs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumberOne = table.Column<string>(nullable: true),
                    NumberTwo = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AreaSearchs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Citys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Citys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Conversations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserIdOne = table.Column<int>(nullable: false),
                    UserIdTwo = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Directs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DirectName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Directs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Distances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Distances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Emails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    To = table.Column<string>(nullable: true),
                    Cc = table.Column<string>(nullable: true),
                    Subject = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LiveTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiveTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NewName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PriceSearchs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumberOne = table.Column<string>(nullable: true),
                    TypePriceOne = table.Column<string>(nullable: true),
                    NumberTwo = table.Column<string>(nullable: true),
                    TypePriceTwo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceSearchs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Serviceprices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Typeofnew = table.Column<string>(nullable: true),
                    PriceDate = table.Column<string>(nullable: true),
                    PriceWeek = table.Column<string>(nullable: true),
                    PriceMonth = table.Column<string>(nullable: true),
                    PriceUpTop = table.Column<string>(nullable: true),
                    Date = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Serviceprices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statuss",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuss", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Times",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Times", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Typeofnews",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Typeofnews", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Provinces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    CityId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provinces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Provinces_Citys_CityId",
                        column: x => x.CityId,
                        principalTable: "Citys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserReceiver = table.Column<int>(nullable: false),
                    SeeReceiver = table.Column<bool>(nullable: false),
                    UserSender = table.Column<int>(nullable: false),
                    SeeSender = table.Column<bool>(nullable: false),
                    ConversationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsHD = table.Column<bool>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ChangeTimes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChangeTimeName = table.Column<string>(nullable: true),
                    TimeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangeTimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangeTimes_Times_TimeId",
                        column: x => x.TimeId,
                        principalTable: "Times",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HovaTen = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    LastLogOnDate = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Gender = table.Column<bool>(nullable: false),
                    EmployeeImage = table.Column<string>(nullable: true),
                    Birthday = table.Column<DateTime>(nullable: false),
                    Phone = table.Column<string>(nullable: true),
                    AddressOne = table.Column<string>(nullable: true),
                    AddressTwo = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    AccountId = table.Column<int>(nullable: false),
                    ManageEmployeeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employees_Employees_ManageEmployeeId",
                        column: x => x.ManageEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HovaTen = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    LastLogOnDate = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Facebook = table.Column<string>(nullable: true),
                    Gender = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    UserImage = table.Column<string>(nullable: true),
                    PubishFree = table.Column<int>(nullable: true),
                    AccountId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BuyMoneys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdBuy = table.Column<string>(nullable: true),
                    Method = table.Column<string>(nullable: true),
                    NumberMoney = table.Column<float>(nullable: false),
                    Promote = table.Column<float>(nullable: false),
                    Receive = table.Column<float>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Note = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuyMoneys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuyMoneys_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LikeCommentPosts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdPost = table.Column<int>(nullable: true),
                    LikePost = table.Column<bool>(nullable: true),
                    IdCommnent = table.Column<int>(nullable: true),
                    LikeComment = table.Column<bool>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeCommentPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikeCommentPosts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messegers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    ConversationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messegers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messegers_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messegers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Motels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Price = table.Column<string>(nullable: true),
                    PriceType = table.Column<string>(nullable: true),
                    DateUpdate = table.Column<DateTime>(nullable: false),
                    DateDue = table.Column<DateTime>(nullable: false),
                    Time = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    Verify = table.Column<bool>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    AddressNumber = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Typemotel = table.Column<string>(nullable: true),
                    AreaZone = table.Column<string>(nullable: true),
                    AreaZoneType = table.Column<string>(nullable: true),
                    Typeservice = table.Column<string>(nullable: true),
                    Latitude = table.Column<string>(nullable: true),
                    Longitude = table.Column<string>(nullable: true),
                    CityId = table.Column<int>(nullable: false),
                    ProvinceId = table.Column<int>(nullable: false),
                    DistrictId = table.Column<int>(nullable: false),
                    StreetId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Motels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Motels_Citys_CityId",
                        column: x => x.CityId,
                        principalTable: "Citys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Motels_Districts_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "Districts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Motels_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Motels_Streets_StreetId",
                        column: x => x.StreetId,
                        principalTable: "Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Motels_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostUser = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    HiddenOrNotHidden = table.Column<bool>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Replys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Decription = table.Column<string>(nullable: true),
                    IsSee = table.Column<bool>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Replys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Replys_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeChoice = table.Column<string>(nullable: true),
                    NumberDatePublish = table.Column<int>(nullable: false),
                    PayMoney = table.Column<float>(nullable: false),
                    MotelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bills_Motels_MotelId",
                        column: x => x.MotelId,
                        principalTable: "Motels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Details",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumberBath = table.Column<int>(nullable: false),
                    NumberLiving = table.Column<int>(nullable: false),
                    Director = table.Column<string>(nullable: true),
                    TypeofnewId = table.Column<int>(nullable: false),
                    LiveTypeId = table.Column<int>(nullable: false),
                    MotelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Details", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Details_LiveTypes_LiveTypeId",
                        column: x => x.LiveTypeId,
                        principalTable: "LiveTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Details_Motels_MotelId",
                        column: x => x.MotelId,
                        principalTable: "Motels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Details_Typeofnews_TypeofnewId",
                        column: x => x.TypeofnewId,
                        principalTable: "Typeofnews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageMotel = table.Column<string>(nullable: true),
                    MotelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Motels_MotelId",
                        column: x => x.MotelId,
                        principalTable: "Motels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommentUser = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    PostId = table.Column<int>(nullable: false),
                    ParentCommentId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Comments_ParentCommentId",
                        column: x => x.ParentCommentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReportPosts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Report = table.Column<string>(nullable: true),
                    Write = table.Column<string>(nullable: true),
                    PostId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReportPosts_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InformComments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUserReceiced = table.Column<int>(nullable: true),
                    JustSee = table.Column<bool>(nullable: false),
                    CommentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InformComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InformComments_Comments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_RoleId",
                table: "Accounts",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_MotelId",
                table: "Bills",
                column: "MotelId");

            migrationBuilder.CreateIndex(
                name: "IX_BuyMoneys_UserId",
                table: "BuyMoneys",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChangeTimes_TimeId",
                table: "ChangeTimes",
                column: "TimeId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ParentCommentId",
                table: "Comments",
                column: "ParentCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Details_LiveTypeId",
                table: "Details",
                column: "LiveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Details_MotelId",
                table: "Details",
                column: "MotelId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Details_TypeofnewId",
                table: "Details",
                column: "TypeofnewId");

            migrationBuilder.CreateIndex(
                name: "IX_Districts_ProvinceId",
                table: "Districts",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_AccountId",
                table: "Employees",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ManageEmployeeId",
                table: "Employees",
                column: "ManageEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_MotelId",
                table: "Images",
                column: "MotelId");

            migrationBuilder.CreateIndex(
                name: "IX_InformComments_CommentId",
                table: "InformComments",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeCommentPosts_UserId",
                table: "LikeCommentPosts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Messegers_ConversationId",
                table: "Messegers",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Messegers_UserId",
                table: "Messegers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Motels_CityId",
                table: "Motels",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Motels_DistrictId",
                table: "Motels",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_Motels_ProvinceId",
                table: "Motels",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Motels_StreetId",
                table: "Motels",
                column: "StreetId");

            migrationBuilder.CreateIndex(
                name: "IX_Motels_UserId",
                table: "Motels",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ConversationId",
                table: "Notifications",
                column: "ConversationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_CityId",
                table: "Provinces",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Replys_UserId",
                table: "Replys",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportPosts_PostId",
                table: "ReportPosts",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Streets_ProvinceId",
                table: "Streets",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AccountId",
                table: "Users",
                column: "AccountId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AreaSearchs");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropTable(
                name: "BuyMoneys");

            migrationBuilder.DropTable(
                name: "ChangeTimes");

            migrationBuilder.DropTable(
                name: "Details");

            migrationBuilder.DropTable(
                name: "Directs");

            migrationBuilder.DropTable(
                name: "Distances");

            migrationBuilder.DropTable(
                name: "Emails");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "InformComments");

            migrationBuilder.DropTable(
                name: "LikeCommentPosts");

            migrationBuilder.DropTable(
                name: "Messegers");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PriceSearchs");

            migrationBuilder.DropTable(
                name: "Replys");

            migrationBuilder.DropTable(
                name: "ReportPosts");

            migrationBuilder.DropTable(
                name: "Serviceprices");

            migrationBuilder.DropTable(
                name: "Statuss");

            migrationBuilder.DropTable(
                name: "Times");

            migrationBuilder.DropTable(
                name: "LiveTypes");

            migrationBuilder.DropTable(
                name: "Typeofnews");

            migrationBuilder.DropTable(
                name: "Motels");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Conversations");

            migrationBuilder.DropTable(
                name: "Districts");

            migrationBuilder.DropTable(
                name: "Streets");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Provinces");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Citys");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
