using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterService.Data;
using System.Net;
using System.Net.Mail;

namespace RecruiterService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApplicationController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> GetApplications([FromQuery] int? phase)
        {
            var query = _context.applications
                .Include(a => a.sidNavigation)
                    .ThenInclude(s => s.uidNavigation).AsQueryable();

            if (phase.HasValue)
            {
                if (phase.Value >= 1 && phase.Value <= 4)
                {
                    query = query.Where(a => a.phase == phase.Value);
                }
                else if (phase.Value == 5) // Selected candidates
                {
                    query = query.Where(a => a.phase == 5);
                }
                else if (phase.Value == 0) // All applications (phase 1 to 4 + selected)
                {
                    query = query.Where(a => a.phase >= 1 && a.phase <= 5);
                }
            }

            var apps = await query.Select(a => new
            {
                appid = a.appid,
                name = a.sidNavigation.uidNavigation.uname,
                email = a.sidNavigation.uidNavigation.email,
                qualification = a.sidNavigation.graduation_degree,
                experience = a.sidNavigation.experience,
                phase = a.phase
            }).ToListAsync();

            return Ok(apps);
        }

        // - 1. Get Applications with Optional Phase Filter
        [HttpGet("{id}")]
        public async Task<IActionResult> GetApplications(int id,[FromQuery]  int? phase)
        {
            var query = _context.applications
                .Include(a => a.sidNavigation)
                    .ThenInclude(s => s.uidNavigation).Where(a=>a.req_id==id) // seeker → user
                .AsQueryable();

            if (phase.HasValue)
            {
                if (phase.Value >= 1 && phase.Value <= 4)
                {
                    query = query.Where(a => a.phase == phase.Value);
                }
                else if (phase.Value == 5) // Selected candidates
                {
                    query = query.Where(a => a.phase == 5);
                }
                else if (phase.Value == 0) // All applications (phase 1 to 4 + selected)
                {
                    query = query.Where(a => a.phase >= 1 && a.phase <= 5);
                }
            }

            var apps = await query.Select(a => new
            {
                appid = a.appid,
                name = a.sidNavigation.uidNavigation.uname,
                email = a.sidNavigation.uidNavigation.email,
                qualification = a.sidNavigation.graduation_degree,
                experience = a.sidNavigation.experience,
                phase = a.phase
            }).ToListAsync();

            return Ok(apps);
        }

        // - 2. Move Selected Candidates to Next Phase + Send Email (Also send email to non-selected phase=0 candidates)
        [HttpPut("{id}/move-to-phase")]
        public async Task<IActionResult> MoveToNextPhase([FromBody] MovePhaseRequest request)
        {
            if (request.AppIds == null || request.AppIds.Count == 0)
                return BadRequest("No applications selected.");

            // 1. Get selected applications by IDs
            var selectedApplications = await _context.applications
                .Include(a => a.sidNavigation)
                    .ThenInclude(s => s.uidNavigation)
                .Where(a => request.AppIds.Contains(a.appid))
                .ToListAsync();

            // 2. Infer currentPhase from selected applications
            // If none selected (should never happen due to above check), default to 0
            int currentPhase = selectedApplications.Any()
                ? selectedApplications.Min(a => a.phase)
                : 0;

            // 3. Get all non-selected applications where phase == currentPhase
            var nonSelectedApplications = await _context.applications
                .Include(a => a.sidNavigation)
                    .ThenInclude(s => s.uidNavigation)
                .Where(a => a.phase == currentPhase && !request.AppIds.Contains(a.appid))
                .ToListAsync();

            // 4. Update phase for selected applications and send email
            foreach (var app in selectedApplications)
            {
                app.phase = request.NewPhase;

                await SendEmailNotification(
                    app.sidNavigation.uidNavigation.email,
                    app.sidNavigation.uidNavigation.uname,
                    request.NewPhase
                );
            }

            // 5. Send rejection email to non-selected candidates whose phase == currentPhase
            foreach (var app in nonSelectedApplications)
            {
                await SendEmailNotification(
                    app.sidNavigation.uidNavigation.email,
                    app.sidNavigation.uidNavigation.uname,
                    0 // phase 0 means non-selected
                );
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Phase updated and emails sent successfully!" });
        }

        

        // - 3. Email Notification Method
        private async Task SendEmailNotification(string toEmail, string name, int newPhase)
        {
            try
            {
                var fromAddress = new MailAddress("tanyasp666@gmail.com", "Recruiter Service");
                var toAddress = new MailAddress(toEmail, name);
                const string fromPassword = "qjav nuqp nyqt fjui"; // Gmail app password
                string subject = "Your Application Status Has Been Updated";

                string phaseText = newPhase switch
                {
                    5 => "Selected",
                    0 => "Currently Not Selected",
                    _ => $"Phase {newPhase}"
                };

                string body = newPhase == 0
                    ? $"Hello {name},\n\nWe wanted to inform you that your application is currently not selected. Thank you for your interest and time.\n\nRegards,\nRecruiter Team"
                    : $"Hello {name},\n\nYour application has been moved to {phaseText}.\nBest of luck for the next steps!\n\nRegards,\nRecruiter Team";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };

                using var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                };

                await smtp.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Email sending failed to {toEmail}: {ex.Message}");
            }
        }
    }

    // -Request DTO
    public class MovePhaseRequest
    {
        public List<int> AppIds { get; set; }
        public int NewPhase { get; set; } // int instead of string
        public int CurrentPhase { get; set; }
    }
}






//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using RecruiterService.Data;
//using System.Net;
//using System.Net.Mail;

//namespace RecruiterService.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ApplicationController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public ApplicationController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        // ✅ 1. Get Applications with Optional Phase Filter
//        [HttpGet]
//        public async Task<IActionResult> GetApplications([FromQuery] int? phase)
//        {
//            var query = _context.applications
//                .Include(a => a.sidNavigation)
//                    .ThenInclude(s => s.uidNavigation) // seeker → user
//                .AsQueryable();

//            if (phase.HasValue)
//            {
//                if (phase.Value >= 1 && phase.Value <= 4)
//                {
//                    query = query.Where(a => a.phase == phase.Value);
//                }
//                else if (phase.Value == 5) // Selected candidates
//                {
//                    query = query.Where(a => a.phase == 5);
//                }
//                else if (phase.Value == 0) // All applications (phase 1 to 4 + selected)
//                {
//                    query = query.Where(a => a.phase >= 1 && a.phase <= 5);
//                }
//            }

//            var apps = await query.Select(a => new
//            {
//                appid = a.appid,
//                name = a.sidNavigation.uidNavigation.uname,
//                email = a.sidNavigation.uidNavigation.email,
//                qualification = a.sidNavigation.graduation_degree,
//                experience = a.sidNavigation.experience,
//                phase = a.phase
//            }).ToListAsync();

//            return Ok(apps);
//        }

//        // ✅ 2. Move Selected Candidates to Next Phase + Send Email
//        [HttpPut("move-to-phase")]
//        public async Task<IActionResult> MoveToNextPhase([FromBody] MovePhaseRequest request)
//        {
//            if (request.AppIds == null || request.AppIds.Count == 0)
//                return BadRequest("No applications selected.");



//            var selectedApplications = await _context.applications
//                .Include(a => a.sidNavigation)
//                    .ThenInclude(s => s.uidNavigation)
//                .Where(a => request.AppIds.Contains(a.appid))
//                .ToListAsync();

//            foreach (var app in selectedApplications)
//            {
//                app.phase = request.NewPhase; // update int phase

//                // Send Email Notification
//                await SendEmailNotification(
//                    app.sidNavigation.uidNavigation.email,
//                    app.sidNavigation.uidNavigation.uname,
//                    request.NewPhase
//                );
//            }

//            await _context.SaveChangesAsync();

//            return Ok(new { message = "Phase updated and emails sent successfully!" });
//        }

//        // ✅ 3. Email Notification Method
//        private async Task SendEmailNotification(string toEmail, string name, int newPhase)
//        {
//            try
//            {
//                Console.WriteLine("Genereating mail");
//                var fromAddress = new MailAddress("tanyasp666@gmail.com", "Recruiter Service");
//                var toAddress = new MailAddress(toEmail, name);
//                const string fromPassword = "qjav nuqp nyqt fjui"; // Gmail app password
//                string subject = "Your Application Status Has Been Updated";

//                string phaseText = newPhase == 5 ? "Selected" : $"Phase {newPhase}";

//                string body = $"Hello {name},\n\n" +
//                              $"Your application has been moved to {phaseText}.\n" +
//                              $"Best of luck for the next steps!\n\n" +
//                              $"Regards,\nRecruiter Team";

//                var smtp = new SmtpClient
//                {
//                    Host = "smtp.gmail.com",
//                    Port = 587,
//                    EnableSsl = true,
//                    DeliveryMethod = SmtpDeliveryMethod.Network,
//                    UseDefaultCredentials = false,
//                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
//                };

//                using var message = new MailMessage(fromAddress, toAddress)
//                {
//                    Subject = subject,
//                    Body = body
//                };

//                await smtp.SendMailAsync(message);
//                Console.WriteLine("Genereated mail",message);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Email sending failed to {toEmail}: {ex.Message}");
//            }
//        }
//    }

//    // ✅ Request DTO
//    public class MovePhaseRequest
//    {
//        public List<int> AppIds { get; set; }
//        public int NewPhase { get; set; } // int instead of string
//    }
//}





