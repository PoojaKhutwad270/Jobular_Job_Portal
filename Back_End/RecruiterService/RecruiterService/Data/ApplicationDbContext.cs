using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using RecruiterService.Models;

namespace RecruiterService.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<additional_qualification> additional_qualifications { get; set; }

    public virtual DbSet<application> applications { get; set; }

    public virtual DbSet<city> cities { get; set; }

    public virtual DbSet<company> companies { get; set; }

    public virtual DbSet<job_requirement> job_requirements { get; set; }

    public virtual DbSet<job_skill> job_skills { get; set; }

    public virtual DbSet<role> roles { get; set; }

    public virtual DbSet<schedule> schedules { get; set; }

    public virtual DbSet<seeker> seekers { get; set; }

    public virtual DbSet<seeker_skill> seeker_skills { get; set; }

    public virtual DbSet<skillset> skillsets { get; set; }

    public virtual DbSet<user> users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p08_jobportaldb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.29-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<additional_qualification>(entity =>
        {
            entity.HasKey(e => e.qid).HasName("PRIMARY");

            entity.HasOne(d => d.sidNavigation).WithMany(p => p.additional_qualifications)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fkaq_sid");
        });

        modelBuilder.Entity<application>(entity =>
        {
            entity.HasKey(e => e.appid).HasName("PRIMARY");

            entity.HasOne(d => d.req).WithMany(p => p.applications)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fkjob_reqid");

            entity.HasOne(d => d.sidNavigation).WithMany(p => p.applications)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fkjob_sid");
        });

        modelBuilder.Entity<city>(entity =>
        {
            entity.HasKey(e => e.cityid).HasName("PRIMARY");
        });

        modelBuilder.Entity<company>(entity =>
        {
            entity.HasKey(e => e.cid).HasName("PRIMARY");

            entity.HasOne(d => d.uidNavigation).WithMany(p => p.companies)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fkc_uid");
        });

        modelBuilder.Entity<job_requirement>(entity =>
        {
            entity.HasKey(e => e.req_id).HasName("PRIMARY");

            entity.HasOne(d => d.cidNavigation).WithMany(p => p.job_requirements)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fkr_cid");
        });

        modelBuilder.Entity<job_skill>(entity =>
        {
            entity.HasKey(e => e.js_id).HasName("PRIMARY");

            entity.HasOne(d => d.req).WithMany(p => p.job_skills)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fkjs_reqi");

            entity.HasOne(d => d.ss).WithMany(p => p.job_skills)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fkjs_ssid");
        });

        modelBuilder.Entity<role>(entity =>
        {
            entity.HasKey(e => e.rid).HasName("PRIMARY");
        });

        modelBuilder.Entity<schedule>(entity =>
        {
            entity.HasKey(e => e.sch_id).HasName("PRIMARY");

            entity.HasOne(d => d.app).WithMany(p => p.schedules)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fksch_appid");
        });

        modelBuilder.Entity<seeker>(entity =>
        {
            entity.HasKey(e => e.sid).HasName("PRIMARY");

            entity.HasOne(d => d.uidNavigation).WithMany(p => p.seekers)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("uid");
        });

        modelBuilder.Entity<seeker_skill>(entity =>
        {
            entity.HasKey(e => e.seekerskill_id).HasName("PRIMARY");

            entity.HasOne(d => d.sidNavigation).WithMany(p => p.seeker_skills)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("sid");

            entity.HasOne(d => d.ss).WithMany(p => p.seeker_skills)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("ss_id");
        });

        modelBuilder.Entity<skillset>(entity =>
        {
            entity.HasKey(e => e.ss_id).HasName("PRIMARY");
        });

        modelBuilder.Entity<user>(entity =>
        {
            entity.HasKey(e => e.uid).HasName("PRIMARY");

            entity.HasOne(d => d.city).WithMany(p => p.users).HasConstraintName("fku_cityid");

            entity.HasOne(d => d.ridNavigation).WithMany(p => p.users)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("rid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
