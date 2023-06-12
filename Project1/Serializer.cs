using Microsoft.AspNetCore.Hosting.Server;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Project1.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Common;
using System.Diagnostics;
using System.IO;
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
                recordIndex++;
            }

            workSheet.Column(1).AutoFit();
            workSheet.Column(2).AutoFit();
            workSheet.Column(3).AutoFit();
            workSheet.Column(4).AutoFit();
            workSheet.Column(5).AutoFit();
            workSheet.Column(6).AutoFit();
            workSheet.Column(7).AutoFit();

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
            MailMessage msgs = new MailMessage();
            msgs.To.Add("kanwardeep.gupta@gmail.com");
            MailAddress address = new MailAddress("info@mankooguptacpa.com");
            msgs.From = address;
            msgs.Subject = "Contact";
            string htmlBody = @"
<!DOCTYPE html >
        
                <
                html >
        
                <
                head >
        
                <
                title > Email < / title > <
        
                / head > <
                body >
        
                <
            h1 > Hi welcome < / h1 > <
                p > Thank you
    for register < / p > <
        / body > <
        / html >
    ";  
    msgs.Body = htmlBody;
    msgs.IsBodyHtml = true;
    SmtpClient client = new SmtpClient();
            client.Host = "relay-hosting.secureserver.net";
            client.Port = 25;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("relay-hosting.secureserver.net", @"Krish""015");
            //Send the msgs  
            client.Send(msgs);
        }
        catch (Exception ex) { }



    }
}