namespace Project1.Models
{
    public class SendEmail
    {
        public string Subject { get; set; }
        public string Body { get; set; }

        public List<string> Emails { get; set; }
    }
}
