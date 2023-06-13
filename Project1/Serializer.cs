using Microsoft.AspNetCore.Hosting.Server;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Project1.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Common;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Project1;

public static class Serializer
{
    public static T Deserialize<T>(string path) where T : class
    {
        XmlSerializer ser = new XmlSerializer(typeof(T));

        using (StreamReader sr = new StreamReader(path))
        {
            return (T)ser.Deserialize(sr);
        }
    }

    public static void Serialize<T>(T ObjectToSerialize, string path)
    {
        XmlSerializer xmlSerializer = new
            XmlSerializer(ObjectToSerialize.GetType());

        bool exists = System.IO.Directory.Exists(Path.GetDirectoryName(path));

        if (!exists)
            System.IO.Directory.CreateDirectory(Path.GetDirectoryName(path));

        using (StreamWriter textWriter = new StreamWriter(path))
        {
            xmlSerializer.Serialize(textWriter, ObjectToSerialize);
        }
    }

    public static List<Clients> getExcelFile()
    {
        string s = null;
        var d = new DirectoryInfo(@"C:\Users\rahul_gupta22\Downloads");
        var files = d.GetFiles("CLIENT DATA- MASTER SHEET.xlsx");

        var file = files[0];
        var fileName = file.FullName;

        using var package = new ExcelPackage(file);
        ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
        var currentSheet = package.Workbook.Worksheets;
        var workSheet = currentSheet[0];
        var noOfCol = workSheet.Dimension.End.Column;
        var noOfRow = workSheet.Dimension.End.Row;

        List<Clients> clients = new List<Clients>();

        for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
        {
            try
            {
                long.TryParse(workSheet.Cells[rowIterator, 5].Value?.ToString(), out var dateNum);

                var user = new Clients
                {
                    SerialNumber = workSheet.Cells[rowIterator, 1].Value?.ToString(),
                    CategoryName = workSheet.Cells[rowIterator, 2].Value?.ToString(),
                    YearEnd = workSheet.Cells[rowIterator, 3].Value?.ToString(),
                    CorporationType = workSheet.Cells[rowIterator, 4].Value?.ToString(),
                    IncorporationDate = DateTime.FromOADate(dateNum).ToString(),
                    IncorporationMonth = workSheet.Cells[rowIterator, 6].Value?.ToString(),
                    ClientName = workSheet.Cells[rowIterator, 7].Value?.ToString(),
                    CompanyName = workSheet.Cells[rowIterator, 8].Value?.ToString(),
                    Address = workSheet.Cells[rowIterator, 9].Value?.ToString(),
                    PhoneNumber = workSheet.Cells[rowIterator, 10].Value?.ToString(),
                    Business = workSheet.Cells[rowIterator, 11].Value?.ToString(),
                    CorporationKey = workSheet.Cells[rowIterator, 12].Value?.ToString(),
                    CompanyKey = workSheet.Cells[rowIterator, 13].Value?.ToString(),
                    HSTPeriod = workSheet.Cells[rowIterator, 14].Value?.ToString(),
                    Email = workSheet.Cells[rowIterator, 15].Value?.ToString(),
                    Status = "active",
                    OntarioOneKeyUser = workSheet.Cells[rowIterator, 16].Value?.ToString() ?? "-",
                    OntarioOneKeyPassword = workSheet.Cells[rowIterator, 17].Value?.ToString() ?? "-",
                    CRAUserId = workSheet.Cells[rowIterator, 18].Value?.ToString() ?? "-",
                    CRAPassword = workSheet.Cells[rowIterator, 19].Value?.ToString() ?? "-",
                    Notes = workSheet.Cells[rowIterator, 20].Value?.ToString() ?? "-",
                    AdditionalNotes = workSheet.Cells[rowIterator, 21].Value?.ToString() ?? "-",
                    ClientId = Guid.NewGuid(),

                };


                clients.Add(user);
            }
            catch (Exception ex)
            {


            }
        }

        return clients;
    }




    public static bool generateExcelFile(ReturnManagement returnManagement)
    {
        try
        {

            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;

            // Creating an instance
            // of ExcelPackage
            ExcelPackage excel = new ExcelPackage();

           

            // name of the sheet
            var workSheet = excel.Workbook.Worksheets.Add(returnManagement.ReturnManagementName);

            // setting the properties
            // of the work sheet 
            workSheet.TabColor = System.Drawing.Color.Black;
            workSheet.DefaultRowHeight = 12;

            // Setting the properties
            // of the first row
            workSheet.Row(1).Height = 20;
            workSheet.Row(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            workSheet.Row(1).Style.Font.Bold = true;

            // Header of the Excel sheet
            workSheet.Cells[1, 1].Value = "S.No";
            workSheet.Cells[1, 2].Value = "Client Name";
            workSheet.Cells[1, 3].Value = "Company Name";
            workSheet.Cells[1, 4].Value = "Email";
            workSheet.Cells[1, 5].Value = "Phone Number";
            workSheet.Cells[1, 6].Value = "Business#";
            workSheet.Cells[1, 7].Value = "Filed";
            workSheet.Cells[1, 8].Value = "HSTPeriod";
            workSheet.Cells[1, 9].Value = "Additional Notes";
            workSheet.Cells[1, 10].Value = "Address";
            workSheet.Cells[1, 11].Value = "Category Name";
            workSheet.Cells[1, 12].Value = "Company Key";
            workSheet.Cells[1, 13].Value = "Corporation Key";
            workSheet.Cells[1, 14].Value = "Corporation Type";
            workSheet.Cells[1, 15].Value = "CRA Password";
            workSheet.Cells[1, 16].Value = "CRA User Id";
            workSheet.Cells[1, 17].Value = "Incorporation Date";
            workSheet.Cells[1, 18].Value = "Incorporation Month";
            workSheet.Cells[1, 19].Value = "Notes";
            workSheet.Cells[1, 20].Value = "Ontario One Key Password";
            workSheet.Cells[1, 21].Value = "Ontario One Key User";
            workSheet.Cells[1, 22].Value = "Status";
            workSheet.Cells[1, 23].Value = "Year End";


            int recordIndex = 2;

            foreach (var client in returnManagement.ClientReturns)
            {
                workSheet.Cells[recordIndex, 1].Value = client.Client.SerialNumber;
                workSheet.Cells[recordIndex, 2].Value = client.Client.ClientName;
                workSheet.Cells[recordIndex, 3].Value = client.Client.CompanyName;
                workSheet.Cells[recordIndex, 4].Value = client.Client.Email;
                workSheet.Cells[recordIndex, 5].Value = client.Client.PhoneNumber;
                workSheet.Cells[recordIndex, 6].Value = client.Client.Business;
                workSheet.Cells[recordIndex, 7].Value = client.Filed == "true" ? "Yes" : "No";


                workSheet.Cells[recordIndex, 8].Value = client.Client.HSTPeriod;
                workSheet.Cells[recordIndex, 9].Value = client.Client.AdditionalNotes;
                workSheet.Cells[recordIndex, 10].Value = client.Client.Address;
                workSheet.Cells[recordIndex, 11].Value = client.Client.CategoryName;
                workSheet.Cells[recordIndex, 12].Value = client.Client.CompanyKey;
                workSheet.Cells[recordIndex, 13].Value = client.Client.CorporationKey;
                workSheet.Cells[recordIndex, 14].Value = client.Client.CorporationType;
                workSheet.Cells[recordIndex, 15].Value = client.Client.CRAPassword;
                workSheet.Cells[recordIndex, 16].Value = client.Client.CRAUserId;
                workSheet.Cells[recordIndex, 17].Value = client.Client.IncorporationDate;
                workSheet.Cells[recordIndex, 18].Value = client.Client.IncorporationMonth;
                workSheet.Cells[recordIndex, 19].Value = client.Client.Notes;
                workSheet.Cells[recordIndex, 20].Value = client.Client.OntarioOneKeyPassword;
                workSheet.Cells[recordIndex, 21].Value = client.Client.OntarioOneKeyUser;
                workSheet.Cells[recordIndex, 22].Value = client.Client.Status;
                workSheet.Cells[recordIndex, 23].Value = client.Client.YearEnd;




                recordIndex++;
            }

            workSheet.Column(1).AutoFit();
            workSheet.Column(2).AutoFit();
            workSheet.Column(3).AutoFit();
            workSheet.Column(4).AutoFit();
            workSheet.Column(5).AutoFit();
            workSheet.Column(6).AutoFit();
            workSheet.Column(7).AutoFit();
            workSheet.Column(8).AutoFit();
            workSheet.Column(9).AutoFit();
            workSheet.Column(10).AutoFit();
            workSheet.Column(11).AutoFit();
            workSheet.Column(12).AutoFit();
            workSheet.Column(13).AutoFit();
            workSheet.Column(14).AutoFit();
            workSheet.Column(15).AutoFit();
            workSheet.Column(16).AutoFit();
            workSheet.Column(17).AutoFit();
            workSheet.Column(18).AutoFit();
            workSheet.Column(19).AutoFit();
            workSheet.Column(20).AutoFit();
            workSheet.Column(21).AutoFit();
            workSheet.Column(22).AutoFit();
            workSheet.Column(23).AutoFit();

            string p_strPath = @"C:\POC\DeepXML\" +  returnManagement.ReturnManagementName + ".xlsx";

            if (File.Exists(p_strPath))
                File.Delete(p_strPath);

            FileStream objFileStrm = File.Create(p_strPath);
            objFileStrm.Close();

            File.WriteAllBytes(p_strPath, excel.GetAsByteArray());
            excel.Dispose();

            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static void SendEmail()
    {

        try
        {
            string smtpServer = "smtp.office365.com";
            int smtpPort = 587;
            string email = "info@mankooguptacpa.com";
            string password = "Krish\"015";
            SmtpClient client1 = new SmtpClient(smtpServer, smtpPort);
            client1.UseDefaultCredentials = false;

            client1.DeliveryMethod = SmtpDeliveryMethod.Network;
            client1.EnableSsl = true;
            client1.ServicePoint.MaxIdleTime = 1;
            //client1.Timeout = 100000;

            client1.Credentials = new NetworkCredential(email, password);

            MailMessage message = new MailMessage();
            message.From = new MailAddress(email);
            message.To.Add("guptrahul23@gmail.com");
            message.Subject = "Subject";
            message.Body = "Body";
            client1.Send(message);
        }
        catch (Exception ex)
        {



        }
    }
}