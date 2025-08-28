using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterService.Data;
using RecruiterService.Models;

namespace RecruiterService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public CompanyController(ApplicationDbContext cntxt)
        {
            context = cntxt;
        }

        // GET: api/Company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetCompanies()
        {
            var companies = await context.companies
                .Select(c => new
                {
                    c.cid,
                    c.uid,
                    c.cname,
                    c.caddress,
                    c.licence,
                    c.pancard,
                    c.documents,
                    c.company_phoneno,
                    c.company_email,
                    c.location,
                    c.status
                })
                .ToListAsync();

            return Ok(companies);
        }

        [HttpPost]
        public async Task<IActionResult> PostCompany([FromBody] company company)
        {
            if (company == null)
                return BadRequest("Invalid data.");

            // Don't allow client to send cid (auto-generated)
            var newCompany = new company
            {
                uid = company.uid,
                cname = company.cname,
                caddress = company.caddress,
                licence = company.licence,
                pancard = company.pancard,
                documents = company.documents,
                company_phoneno = company.company_phoneno,
                company_email = company.company_email,
                location = company.location,
                status = company.status
            };

            context.companies.Add(newCompany);
            await context.SaveChangesAsync();

            return Ok(newCompany);
        }


        [HttpGet("{uid}")]
        public async Task<ActionResult<object>> GetCompanyById(int uid)
        {
            var company = await context.companies.Include(s=>s.uidNavigation).ThenInclude(u => u.city).Where(c => c.uid == uid)
                .Select(c => new
                {
                    c.cid,
                    c.uid,
                    c.cname,
                    c.caddress,
                    c.licence,
                    c.pancard,
                    c.documents,
                    c.company_phoneno,
                    c.company_email,
                    c.location,
                    c.status,
                    UserName = c.uidNavigation.uname,
                    UserEmail = c.uidNavigation.email,
                    CityName = c.uidNavigation.city != null ? c.uidNavigation.city.cityname : null
                })
                .FirstOrDefaultAsync();

            if (company == null)
                return NotFound($"No company found for user id {uid}");

            return Ok(company);
        }


        [HttpPut("UpdateCompany/{cid}")]
        public async Task<IActionResult> UpdateCompany(int cid, [FromBody] CompanyUpdateDto companyDto)
        {
            if (cid != companyDto.Cid)
                return BadRequest("Company ID mismatch.");

            var company = await context.companies.FindAsync(cid);

            if (company == null)
                return NotFound($"Company with id {cid} not found.");

            // Update fields (only the ones allowed to update)
            company.cname = companyDto.Cname;
            company.company_email = companyDto.Email;
            company.company_phoneno = companyDto.Phone;
            company.caddress = companyDto.Address;
            company.location = companyDto.Location;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // handle exception, e.g. log error
                return StatusCode(500, "Failed to update company.");
            }

            return NoContent(); // 204 success response with no content
        }

        public class CompanyUpdateDto
        {
            public int Cid { get; set; }
            public string Cname { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public string Location { get; set; }
        }


    }
}