using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterService.Data;
using RecruiterService.Models;

namespace RecruiterService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SkillSetController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public SkillSetController(ApplicationDbContext cntxt)
        {
            context = cntxt;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSkillSets()
        {
            var skills = await context.skillsets
                .Select(s => new
                {
                    ss_id = s.ss_id,
                    ss_name = s.skillname
                })
                .ToListAsync();

            return Ok(skills);
        }

    }
}
