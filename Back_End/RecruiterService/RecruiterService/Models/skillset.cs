using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("skillset")]
[Index("skillname", Name = "skillname_UNIQUE", IsUnique = true)]
public partial class skillset
{
    [Key]
    public int ss_id { get; set; }

    [StringLength(100)]
    public string skillname { get; set; } = null!;

    [InverseProperty("ss")]
    public virtual ICollection<job_skill> job_skills { get; set; } = new List<job_skill>();

    [InverseProperty("ss")]
    public virtual ICollection<seeker_skill> seeker_skills { get; set; } = new List<seeker_skill>();
}
