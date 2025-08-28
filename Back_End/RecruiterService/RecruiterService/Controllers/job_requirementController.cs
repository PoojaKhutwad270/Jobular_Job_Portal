using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterService.Data;
using RecruiterService.Models;
//using RecruiterService.DTOs;

[ApiController]
[Route("api/[controller]/[action]")]
public class job_requirementController : ControllerBase
{
    private readonly ApplicationDbContext context;

    public job_requirementController(ApplicationDbContext context)
    {
        this.context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<object>>> GetJobRequirements(int id)
    {
        var jobRequirements = await context.job_requirements.Include(j => j.cidNavigation)     // Include related company
        .Where(j => j.cidNavigation.uid == id)  // Filter by company.user.uid == id
        .Select(j => new
            {
                j.req_id,
                j.cid,
                j.job_title,
                j.salary,
                j.experience,
                j.deadline,
                j.role_description,
            applicantCount = context.applications.Count(a => a.req_id == j.req_id)
        }) 
            .ToListAsync();

        return Ok(jobRequirements);
    }

    [HttpPost]
    public async Task<IActionResult> PostJob([FromBody] JobRequirementDto dto)
    {
        var job = new job_requirement
        {
            cid = dto.cid,
            job_title = dto.job_title,
            salary = dto.salary,
            experience = dto.experience,
            deadline = dto.deadline,
            role_description = dto.role_description
        };

        context.job_requirements.Add(job);
        await context.SaveChangesAsync(); // Save first to get req_id

        foreach (var skillId in dto.skillIds)
        {
            var skillExists = await context.skillsets.AnyAsync(s => s.ss_id == skillId);

            if (!skillExists)
                return BadRequest($"Skill with id {skillId} does not exist.");

            var jobSkill = new job_skill
            {
                req_id = job.req_id,
                ss_id = skillId
            };

            context.job_skills.Add(jobSkill);
        }

        await context.SaveChangesAsync();

        return Ok(new { message = "Job and associated skills saved successfully." });
    }

    [HttpGet("{reqid}")]
    public async Task<ActionResult<IEnumerable<object>>> GetJobReqPost(int reqid)
    {
        var jobRequirements = await context.job_requirements.Include(j => j.cidNavigation)   // Include related company
 .Where(j => j.req_id == reqid)  // Filter by company.user.uid == id
        .Select(j => new
        {
            j.req_id,
            j.cid,
            j.cidNavigation.cname,
            j.cidNavigation.caddress,
            j.job_title,
            j.salary,
            j.experience,
            j.deadline,
            j.role_description,
            applicantCount = context.applications.Count(a => a.req_id == j.req_id)
        })
            .ToListAsync();

        return Ok(jobRequirements);
    }
}
