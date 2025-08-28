using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("user")]
[Index("email", Name = "email_UNIQUE", IsUnique = true)]
[Index("cityid", Name = "fku_cityid_idx")]
[Index("password", Name = "password_UNIQUE", IsUnique = true)]
[Index("phone_no", Name = "phone_no_UNIQUE", IsUnique = true)]
[Index("rid", Name = "rid_idx")]
public partial class user
{
    [Key]
    public int uid { get; set; }

    public int? rid { get; set; }

    [StringLength(255)]
    public string? uname { get; set; }

    public string? email { get; set; }

    public string? phone_no { get; set; }

    [StringLength(255)]
    public string address { get; set; } = null!;

    public int? cityid { get; set; }

    public string password { get; set; } = null!;

    [ForeignKey("cityid")]
    [InverseProperty("users")]
    public virtual city? city { get; set; }

    [InverseProperty("uidNavigation")]
    public virtual ICollection<company> companies { get; set; } = new List<company>();

    [ForeignKey("rid")]
    [InverseProperty("users")]
    public virtual role? ridNavigation { get; set; }

    [InverseProperty("uidNavigation")]
    public virtual ICollection<seeker> seekers { get; set; } = new List<seeker>();
}
