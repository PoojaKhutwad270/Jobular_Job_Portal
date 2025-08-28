using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("job_requirement")]
[Index("cid", Name = "fkr_cid_idx")]
public partial class job_requirement
{
    [Key]
    public int req_id { get; set; }

    public int? cid { get; set; }

    [StringLength(150)]
    public string job_title { get; set; } = null!;

    public float? salary { get; set; }

    public int experience { get; set; }

    public DateOnly deadline { get; set; }

    public string? role_description { get; set; }

    [InverseProperty("req")]
    public virtual ICollection<application> applications { get; set; } = new List<application>();

    [ForeignKey("cid")]
    [InverseProperty("job_requirements")]
    public virtual company? cidNavigation { get; set; }

    [InverseProperty("req")]
    public virtual ICollection<job_skill> job_skills { get; set; } = new List<job_skill>();
}
