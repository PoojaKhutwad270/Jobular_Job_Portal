public class JobRequirementDto
{
    public int cid { get; set; }
    public string job_title { get; set; }
    public float? salary { get; set; }
    public int experience { get; set; }
    public DateOnly deadline { get; set; }
    public string? role_description { get; set; }
    public List<int> skillIds { get; set; }
}
