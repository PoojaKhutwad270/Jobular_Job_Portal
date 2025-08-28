using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("application")]
[Index("req_id", Name = "fkjob_reqid_idx")]
[Index("sid", Name = "fkjob_sid_idx")]
public partial class application
{
    [Key]
    public int appid { get; set; }

    public int? sid { get; set; }

    public int? req_id { get; set; }

    public int status { get; set; }

    public DateOnly date { get; set; }

    public int phase { get; set; }

    [ForeignKey("req_id")]
    [InverseProperty("applications")]
    public virtual job_requirement? req { get; set; }

    [InverseProperty("app")]
    public virtual ICollection<schedule> schedules { get; set; } = new List<schedule>();

    [ForeignKey("sid")]
    [InverseProperty("applications")]
    public virtual seeker? sidNavigation { get; set; }
}
