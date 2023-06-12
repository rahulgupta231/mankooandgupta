namespace Project1.Models
{
    public class ReturnManagementVM
    {
        public string ReturnManagementId { get; set; }
        public string ReturnManagementName { get; set; }
        public string HSTPeriod { get; set; }
    }


    public class ReturnManagement
    {
        public Guid ReturnManagementId { get; set; }
        public string ReturnManagementName { get; set; }
        public List<string> HSTPeriod { get; set; }
        public List<ClientReturns> ClientReturns { get; set; }
    }

    public class ClientReturns
    {
        public Clients Client { get; set; }
        public string Filed { get; set; }
    }
}
