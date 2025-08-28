using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("seeker")]
[Index("uid", Name = "uid_idx")]
public partial class seeker
{
    [Key]
    public int sid { get; set; }

    public int? uid { get; set; }

    [StringLength(255)]
    public string school_name_10th { get; set; } = null!;

    [Precision(5, 2)]
    public decimal marks_10th { get; set; }

    [StringLength(255)]
    public string school_name_12th { get; set; } = null!;

    [Precision(5, 2)]
    public decimal marks_12th { get; set; }

    [StringLength(50)]
    public string graduation_degree { get; set; } = null!;

    [StringLength(255)]
    public string grad_university { get; set; } = null!;

    [Precision(5, 2)]
    public decimal graduation_marks { get; set; }

    public DateOnly passout_year { get; set; }

    public int experience { get; set; }

    public DateOnly DOB { get; set; }

    [StringLength(20)]
    public string gender { get; set; } = null!;

    [StringLength(250)]
    public string resume { get; set; } = null!;

    [InverseProperty("sidNavigation")]
    public virtual ICollection<additional_qualification> additional_qualifications { get; set; } = new List<additional_qualification>();

    [InverseProperty("sidNavigation")]
    public virtual ICollection<application> applications { get; set; } = new List<application>();

    [InverseProperty("sidNavigation")]
    public virtual ICollection<seeker_skill> seeker_skills { get; set; } = new List<seeker_skill>();

    [ForeignKey("uid")]
    [InverseProperty("seekers")]
    public virtual user? uidNavigation { get; set; }
}
