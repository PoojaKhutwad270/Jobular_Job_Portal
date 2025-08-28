using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("role")]
[Index("rname", Name = "rname_UNIQUE", IsUnique = true)]
public partial class role
{
    [Key]
    public int rid { get; set; }

    public string? rname { get; set; }

    [InverseProperty("ridNavigation")]
    public virtual ICollection<user> users { get; set; } = new List<user>();
}
