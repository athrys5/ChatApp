using ChatApp.Models;
using ChatApp.Service;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

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

            // Notify the group that a new user has joined
            await Clients.Group(connection.ChatRoom)
                .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined {connection.ChatRoom}");

            // Update the user list for the specific chat room
            await UpdateUserList(connection.ChatRoom);
        }

        public async Task LeaveChatroom()
        {
            if (_shared.connections.TryRemove(Context.ConnectionId, out var connection))
            {
                // Remove the user from the group
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, connection.ChatRoom);

                // Notify the group that the user has left
                await Clients.Group(connection.ChatRoom)
                    .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has left {connection.ChatRoom}");

                // Update the user list for the specific chat room
                await UpdateUserList(connection.ChatRoom);
            }
            else
            {
                Console.WriteLine("User connection not found.");
            }
        }

        public async Task SendMessage(string msg)
        {
            if (_shared.connections.TryGetValue(Context.ConnectionId, out var connection))
            {
                await Clients.Group(connection.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", connection.Username, msg);
            }
            else
            {
                Console.WriteLine("User connection not found.");
            }
        }

        private async Task UpdateUserList(string chatRoom)
        {
            // Filter connections by the specific chat room
            var usersInRoom = _shared.connections
                .Where(c => c.Value.ChatRoom == chatRoom)
                .Select(c => c.Value.Username)
                .ToList();

            // Send the updated user list to the specific chat room
            await Clients.Group(chatRoom).SendAsync("ReceiveUserList", usersInRoom);
        }
    }
}