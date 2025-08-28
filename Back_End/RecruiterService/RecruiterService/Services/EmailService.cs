using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace RecruiterService.Services
{
    public class EmailService
    {
        private readonly string _fromEmail = "your_email@gmail.com";
        private readonly string _appPassword = "your_app_password"; // Gmail App Password

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            using var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(_fromEmail, _appPassword),
                EnableSsl = true
            };

            var mail = new MailMessage(_fromEmail, to, subject, body)
            {
                IsBodyHtml = true
            };

            await client.SendMailAsync(mail);
        }
    }
}
