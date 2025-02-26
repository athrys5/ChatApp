
using System.Security.Claims;
using ChatApp.Data;
using ChatApp.Hubs;
using ChatApp.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");

            builder.Services.AddDbContext<ApplicationDbContext>(options  => options.UseSqlServer(connectionString));

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();


            // Add services to the container.
            builder.Services.AddSignalR();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("chat-ui", builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });

            builder.Services.AddSingleton<SharedDb>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseHttpsRedirection(); // Only enable HTTPS redirection in production
            }

            app.UseAuthorization();

            app.UseCors("chat-ui"); // Place before MapHub
            app.MapHub<ChatHub>("/Chat");

            app.MapIdentityApi<ApplicationUser>();

            app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
            {

                await signInManager.SignOutAsync();
                return Results.Ok();

            }).RequireAuthorization();


            app.MapGet("/pingauth", (ClaimsPrincipal user) =>
            {
                var email = user.FindFirstValue(ClaimTypes.Email); // get the user's email from the claim
                return Results.Json(new { Email = email }); ; // return the email as a plain text response
            }).RequireAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
