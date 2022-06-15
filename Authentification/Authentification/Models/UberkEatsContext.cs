﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Authentification.Models
{
    public partial class UberkEatsContext : DbContext
    {
        public UberkEatsContext()
        {
        }

        public UberkEatsContext(DbContextOptions<UberkEatsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Userrole> Userrole { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-TOD8MOS;Database=Uberk-Eats;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("ROLE");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USER");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Mail)
                    .IsRequired()
                    .HasColumnName("MAIL")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("PHONE")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("SURNAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Useraffiliate).HasColumnName("USERAFFILIATE");

                entity.HasOne(d => d.UseraffiliateNavigation)
                    .WithMany(p => p.InverseUseraffiliateNavigation)
                    .HasForeignKey(d => d.Useraffiliate)
                    .HasConstraintName("FK__USER__USERAFFILI__14270015");
            });

            modelBuilder.Entity<Userrole>(entity =>
            {
                entity.ToTable("USERROLE");

                entity.Property(e => e.Userroleid).HasColumnName("USERROLEID");

                entity.Property(e => e.Roleid).HasColumnName("ROLEID");

                entity.Property(e => e.Userid).HasColumnName("USERID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Userrole)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("FK__USERROLE__ROLEID__17F790F9");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Userrole)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("FK__USERROLE__USERID__17036CC0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}