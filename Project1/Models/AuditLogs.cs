namespace Project1.Models
{
    public class AuditLogs
    {
        public Guid AuditLogId { get; set; }
        public DateTime ChangedDate { get; set; }
        public string Previous { get; set; }

        public string Updated { get; set; }
        public string ChangedBy { get; set; }
        public string Action { get; set; }
        public string ClientId { get; set; }
    }
}
