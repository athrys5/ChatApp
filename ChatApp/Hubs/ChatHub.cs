using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection connection)
        {
            //ReceiveMessage method used by the client to receive messages 

            await Clients.All
                .SendAsync("ReceiveMessage","admin", $"{connection.Username} has joined.");
        }

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            //Divide client by "areas" through Groups

            await Groups
                .AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            await Clients.Group(connection.ChatRoom)
                .SendAsync("ReceiveMessage","admin",$"{connection.Username} has joined {connection.ChatRoom}");
        }
    }
}
