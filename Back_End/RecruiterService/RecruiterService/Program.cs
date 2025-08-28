using Microsoft.EntityFrameworkCore;
using RecruiterService.Data;
using RecruiterService.Services;

namespace RecruiterService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy
                        .WithOrigins("http://localhost:5173", "http://localhost:5174" )// React dev server
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });

            // Configure services
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    new MySqlServerVersion(new Version(8, 0, 36))
                ));
            
            builder.Services.AddScoped<EmailService>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            

            var app = builder.Build();

            //Use the CORS policy
            app.UseCors("AllowReactApp");

            // Enable Swagger
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
