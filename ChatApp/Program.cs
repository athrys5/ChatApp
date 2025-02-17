
using Microsoft.AspNetCore.SignalR;

namespace ChatApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSignalR();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapPost("broadcast", async (string message, IHubContext<ChatHub, IChatClient> context) =>
            {
                await context.Clients.All.ReceiveMessage(message);

                return Results.NoContent();
            });

            app.MapHub<ChatHub>("chat-hub");

            app.MapControllers();

            app.Run();
        }
    }
}
