using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("job_skill")]
[Index("req_id", Name = "fkjs_reqi_idx")]
[Index("ss_id", Name = "fkjs_ssid_idx")]
public partial class job_skill
{
    [Key]
    public int js_id { get; set; }

    public int? req_id { get; set; }

    public int? ss_id { get; set; }

    [ForeignKey("req_id")]
    [InverseProperty("job_skills")]
    public virtual job_requirement? req { get; set; }

    [ForeignKey("ss_id")]
    [InverseProperty("job_skills")]
    public virtual skillset? ss { get; set; }
}
