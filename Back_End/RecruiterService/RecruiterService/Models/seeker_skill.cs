using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("seeker_skill")]
[Index("sid", Name = "sid_idx")]
[Index("ss_id", Name = "ss_id_idx")]
public partial class seeker_skill
{
    [Key]
    public int seekerskill_id { get; set; }

    public int? sid { get; set; }

    public int? ss_id { get; set; }

    [ForeignKey("sid")]
    [InverseProperty("seeker_skills")]
    public virtual seeker? sidNavigation { get; set; }

    [ForeignKey("ss_id")]
    [InverseProperty("seeker_skills")]
    public virtual skillset? ss { get; set; }
}
