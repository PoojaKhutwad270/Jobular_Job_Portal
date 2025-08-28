//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using Microsoft.EntityFrameworkCore;

//namespace RecruiterService.Models;

//[Table("company")]
//[Index("caddress", Name = "caddress_UNIQUE", IsUnique = true)]
//[Index("cname", Name = "cname_UNIQUE", IsUnique = true)]
//[Index("company_email", Name = "comapany_email_UNIQUE", IsUnique = true)]
//[Index("company_phoneno", Name = "company_phoneno_UNIQUE", IsUnique = true)]
//[Index("licence", Name = "licence_UNIQUE", IsUnique = true)]
//[Index("pancard", Name = "pancard_UNIQUE", IsUnique = true)]
//[Index("uid", Name = "uid_idx")]
//public partial class company
//{
//    [Key]
//    public int cid { get; set; }

//    public int? uid { get; set; }

//    [StringLength(50)]
//    public string cname { get; set; } = null!;

//    [StringLength(250)]
//    public string caddress { get; set; } = null!;

//    [StringLength(50)]
//    public string licence { get; set; } = null!;

//    [StringLength(50)]
//    public string pancard { get; set; } = null!;

//    [StringLength(255)]
//    public string documents { get; set; } = null!;

//    [StringLength(20)]
//    public string company_phoneno { get; set; } = null!;

//    [StringLength(50)]
//    public string company_email { get; set; } = null!;

//    [StringLength(50)]
//    public string location { get; set; } = null!;

//    [InverseProperty("cidNavigation")]
//    public virtual ICollection<job_requirement> job_requirements { get; set; } = new List<job_requirement>();

//    [ForeignKey("uid")]
//    [InverseProperty("companies")]
//    public virtual user? uidNavigation { get; set; }
//}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("company")]
[Index("caddress", Name = "caddress_UNIQUE", IsUnique = true)]
[Index("cname", Name = "cname_UNIQUE", IsUnique = true)]
[Index("company_email", Name = "comapany_email_UNIQUE", IsUnique = true)]
[Index("company_phoneno", Name = "company_phoneno_UNIQUE", IsUnique = true)]
[Index("licence", Name = "licence_UNIQUE", IsUnique = true)]
[Index("pancard", Name = "pancard_UNIQUE", IsUnique = true)]
[Index("uid", Name = "uid_idx")]
public partial class company
{
    [Key]
    public int cid { get; set; }

    public int? uid { get; set; }

    [StringLength(50)]
    public string cname { get; set; } = null!;

    [StringLength(250)]
    public string caddress { get; set; } = null!;

    [StringLength(50)]
    public string licence { get; set; } = null!;

    [StringLength(50)]
    public string pancard { get; set; } = null!;

    [StringLength(255)]
    public string documents { get; set; } = null!;

    [StringLength(20)]
    public string company_phoneno { get; set; } = null!;

    [StringLength(50)]
    public string company_email { get; set; } = null!;

    [StringLength(50)]
    public string location { get; set; } = null!;

    // New Status field
    [Required]
    [DefaultValue(0)] // optional for migrations
    public int status { get; set; } = 0;

    [InverseProperty("cidNavigation")]
    public virtual ICollection<job_requirement> job_requirements { get; set; } = new List<job_requirement>();

    [ForeignKey("uid")]
    [InverseProperty("companies")]
    public virtual user? uidNavigation { get; set; }
}
