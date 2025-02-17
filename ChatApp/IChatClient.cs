namespace ChatApp
{
    public interface IChatClient
    {
        Task ReceiveMessage(string message);
    }
}
