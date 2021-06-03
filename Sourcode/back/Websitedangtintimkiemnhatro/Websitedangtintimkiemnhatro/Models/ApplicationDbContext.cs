using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<AreaSearch> AreaSearchs { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BuyMoney> BuyMoneys { get; set; }
        public DbSet<City> Citys { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Motel> Motels { get; set; }
        public DbSet<PriceSearch> PriceSearchs { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Serviceprice> Serviceprices { get; set; }
        public DbSet<Typeofnew> Typeofnews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<LiveType> LiveTypes { get; set; }
        public DbSet<Reply> Replys { get; set; }
        public DbSet<Street> Streets { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<LikeCommentPost> LikeCommentPosts { get; set; }
        public DbSet<InformComment> InformComments { get; set; }
        public DbSet<ReportPost> ReportPosts { get; set; }
        public DbSet<Messeger> Messegers { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Direct> Directs { get; set; }
        public DbSet<New> News { get; set; }
        public DbSet<Time> Times { get; set; }
        public DbSet<ChangeTime> ChangeTimes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<New>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<Time>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<ChangeTime>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Time).WithMany(d => d.ChangeTimes).HasForeignKey(d => d.TimeId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Direct>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<Conversation>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<Messeger>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.User).WithMany(d => d.Messegers).HasForeignKey(d => d.UserId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Conversation).WithMany(d => d.Messegers).HasForeignKey(d => d.ConversationId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ReportPost>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Post).WithMany(d => d.ReportPosts).HasForeignKey(d => d.PostId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<InformComment>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Comment).WithMany(d => d.InformComments).HasForeignKey(d => d.CommentId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<LikeCommentPost>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<PriceSearch>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<LiveType>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });


            modelBuilder.Entity<AreaSearch>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<Email>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<BuyMoney>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<Serviceprice>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

          
            modelBuilder.Entity<Typeofnew>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<Account>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(a => a.User).WithOne(u => u.Account).HasForeignKey<User>(u => u.AccountId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(a => a.Employee).WithOne(u => u.Account).HasForeignKey<Employee>(u => u.AccountId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(a => a.Role).WithMany(u => u.Accounts).HasForeignKey(u => u.RoleId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(a => a.BuyMoney).WithOne(u => u.User).HasForeignKey<BuyMoney>(u => u.UserId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Motel>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.City).WithMany(d => d.Motels).HasForeignKey(d => d.CityId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Province).WithMany(d => d.Motels).HasForeignKey(d => d.ProvinceId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.District).WithMany(d => d.Motels).HasForeignKey(d => d.DistrictId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Street).WithMany(d => d.Motels).HasForeignKey(d => d.StreetId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(a => a.Detail).WithOne(u => u.Motel).HasForeignKey<Detail>(u => u.MotelId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Detail>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Typeofnew).WithMany(d => d.Details).HasForeignKey(d => d.TypeofnewId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.LiveType).WithMany(d => d.Details).HasForeignKey(d => d.LiveTypeId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Motel).WithMany(d => d.Bills).HasForeignKey(d => d.MotelId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Motel).WithMany(d => d.Images).HasForeignKey(d => d.MotelId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.HasOne(e => e.City).WithMany(d => d.Provinces).HasForeignKey(d => d.CityId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Reply>(entity =>
            {
                entity.HasOne(e => e.User).WithMany(d => d.Replys).HasForeignKey(d => d.UserId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<District>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Province).WithMany(d => d.Districts).HasForeignKey(d => d.ProvinceId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Street>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.Province).WithMany(d => d.Streets).HasForeignKey(d => d.ProvinceId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.ManageEmployee).WithMany(d => d.ChildManageEmployees).HasForeignKey(d => d.ManageEmployeeId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.User).WithMany(d => d.Posts).HasForeignKey(d => d.UserId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasOne(e => e.User).WithMany(d => d.Comments).HasForeignKey(d => d.UserId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Post).WithMany(d => d.Comments).HasForeignKey(d => d.PostId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.ParentComment).WithMany(d => d.ChildComments).HasForeignKey(d => d.ParentCommentId).OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
