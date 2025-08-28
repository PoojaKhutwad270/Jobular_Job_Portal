using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecruiterService.Models;

[Table("city")]
[Index("cityname", Name = "cityname_UNIQUE", IsUnique = true)]
public partial class city
{
    [Key]
    public int cityid { get; set; }

    public string? cityname { get; set; }

    [InverseProperty("city")]
    public virtual ICollection<user> users { get; set; } = new List<user>();
}
