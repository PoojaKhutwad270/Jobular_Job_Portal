using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("schedule")]
[Index("appid", Name = "fksch_appid_idx")]
public partial class schedule
{
    [Key]
    public int sch_id { get; set; }

    public int? appid { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime meeting_time { get; set; }

    public int status { get; set; }

    [StringLength(20)]
    public string result { get; set; } = null!;

    [StringLength(45)]
    public string interviewer { get; set; } = null!;

    [StringLength(255)]
    public string? comment { get; set; }

    [ForeignKey("appid")]
    [InverseProperty("schedules")]
    public virtual application? app { get; set; }
}
