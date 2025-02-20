using ChatApp.Models;
using ChatApp.Service;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;
        public ChatHub(SharedDb shared) => _shared = shared;
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

            //When someones join the chatroom add their connectionId (unique) to shareddb
            _shared.connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom)
                .SendAsync("JoinSpecificChatRoom", "admin",$"{connection.Username} has joined {connection.ChatRoom}");
        }

        public async Task SendMessage(string msg)
        {
            if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
            { 
                //When i want to send the message, take receiver connectionId out and use it to send the msg
                await Clients.Group(connection.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", connection.Username, msg);
            }
        }
    }
}
