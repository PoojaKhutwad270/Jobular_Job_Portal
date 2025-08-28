using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("additional_qualification")]
[Index("sid", Name = "fkaq_sid_idx")]
[Index("qname", Name = "qname_UNIQUE", IsUnique = true)]
public partial class additional_qualification
{
    [Key]
    public int qid { get; set; }

    public int? sid { get; set; }

    [StringLength(50)]
    public string qname { get; set; } = null!;

    [Precision(5, 2)]
    public decimal marks { get; set; }

    [StringLength(50)]
    public string specialization { get; set; } = null!;

    [StringLength(255)]
    public string university { get; set; } = null!;

    [StringLength(15)]
    public string grade { get; set; } = null!;

    [ForeignKey("sid")]
    [InverseProperty("additional_qualifications")]
    public virtual seeker? sidNavigation { get; set; }
}
