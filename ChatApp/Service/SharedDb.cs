using System.Collections.Concurrent;
using ChatApp.Models;

namespace ChatApp.Service
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections;

        public ConcurrentDictionary<string, UserConnection> connections => _connections;
    }
}
