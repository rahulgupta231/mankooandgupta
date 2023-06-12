﻿using Microsoft.AspNetCore.Mvc;
using Project1.Helper;
using Project1.Models;
using System.Collections.Generic;
using System.Text.Json;

namespace Project1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("categories")]
        public IEnumerable<Categories> GetCategories()
        {
            try
            {
                var path = @"C:\POC\DeepXML\Categories.xml";

                #region Read Data from Client XML

                //var clientPath = @"C:\POC\DeepXML\Clients.xml";

                ////Serializer.Serialize(test, path);

                //var clients = Serializer.Deserialize<List<Clients>>(clientPath);

                //var categoriesListClient = clients.Select(x => x.CategoryName).ToList();

                //var distinctCategories= categoriesListClient.Distinct().ToList();

                //List<Categories> categories1 = new List<Categories>();
                //foreach (var category in distinctCategories)
                //{
                //    if (category != null)
                //    {
                //        categories1.Add(new Categories
                //        {
                //            CategoryId = Guid.NewGuid(),
                //            Name = category
                //        });
                //    }

                // };

                //Serializer.Serialize(categories1, path);

                #endregion




                var categories = Serializer.Deserialize<List<Categories>>(path);
                return categories;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpGet("categories/{id}")]
        public Categories GetCategories(Guid id)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(path);

                var categoryById = categories.FirstOrDefault(x => x.CategoryId == id);

                return categoryById;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpPost("create-categories")]
        public void CreateCategory(Categories category)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(path);

                var isExisting = categories.FirstOrDefault(x => x.Name.ToLower() == category.Name.Trim().ToLower());

                if (isExisting != null)
                {
                    throw new Exception("Category Already Exists !");
                }

                categories.Add(new Categories
                {
                    CategoryId = Guid.NewGuid(),
                    Name = category.Name
                });

                Serializer.Serialize(categories, path);
            }
            catch (Exception ex)
            {
                throw new Exception("Category Already Exists !");
            }
        }

        [HttpPut("edit-categories/{id}")]
        public void GetCategories(Guid id, Categories category)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(path);

                var isExisting = categories.FirstOrDefault(x => x.Name.ToLower() == category.Name.Trim().ToLower());

                if (isExisting != null)
                {
                    throw new Exception("Category Already Exists !");
                }

                categories.FirstOrDefault(x => x.CategoryId == id).Name = category.Name;

                Serializer.Serialize(categories, path);

            }
            catch (Exception ex)
            {
                throw new Exception("Category Already Exists !");
            }
        }

        [HttpGet("corporations")]
        public IEnumerable<Corporation> GetCorporations()
        {
            try
            {
                var path = @"C:\POC\DeepXML\Corporations.xml";

                #region Read Data from Client XML

                //var clientPath = @"C:\POC\DeepXML\Clients.xml";

                //var clients = Serializer.Deserialize<List<Clients>>(clientPath);

                //var corporationsListClient = clients.Select(x => x.CorporationType).ToList();

                //var distinctCorporations = corporationsListClient.Distinct().ToList();

                //List<Corporation> corporation1 = new List<Corporation>();
                //foreach (var corporation in distinctCorporations)
                //{
                //    if (corporation != null)
                //    {
                //        corporation1.Add(new Corporation
                //        {
                //            CorporationId = Guid.NewGuid(),
                //            Name = corporation
                //        });
                //    }

                //};

                //Serializer.Serialize(corporation1, path);

                #endregion


                var corporations = Serializer.Deserialize<List<Corporation>>(path);
                return corporations;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpGet("corporations/{id}")]
        public Corporation GetCorporations(Guid id)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Corporations.xml";
                var corporations = Serializer.Deserialize<List<Corporation>>(path);

                var corporationById = corporations.FirstOrDefault(x => x.CorporationId == id);

                return corporationById;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpPost("create-corporations")]
        public void CreateCorporations(Corporation corporation)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Corporations.xml";
                var corporations = Serializer.Deserialize<List<Corporation>>(path);

                var isExisting = corporations.FirstOrDefault(x => x.Name.ToLower() == corporation.Name.Trim().ToLower());

                if (isExisting != null)
                {
                    throw new Exception("Corporation Type Already Exists !");
                }


                corporations.Add(new Corporation
                {
                    CorporationId = Guid.NewGuid(),
                    Name = corporation.Name
                });

                Serializer.Serialize(corporations, path);
            }
            catch (Exception ex)
            {
                throw new Exception("Corporation Type Already Exists !");
            }
        }

        [HttpPut("edit-corporations/{id}")]
        public void EditCategories(Guid id, Corporation corporation)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Corporations.xml";
                var corporations = Serializer.Deserialize<List<Corporation>>(path);

                var isExisting = corporations.FirstOrDefault(x => x.Name.ToLower() == corporation.Name.Trim().ToLower());

                if (isExisting != null)
                {
                    throw new Exception("Corporation Type Already Exists !");
                }

                corporations.FirstOrDefault(x => x.CorporationId == id).Name = corporation.Name;

                Serializer.Serialize(corporations, path);

            }
            catch (Exception ex)
            {
                throw new Exception("Corporation Type Already Exists !");
            }
        }

        [HttpGet("clients")]
        public IEnumerable<Clients> GetClients()
        {
            try
            {
                //List<Clients>  test = Serializer.getExcelFile();

                var path = @"C:\POC\DeepXML\Clients.xml";

                //Serializer.Serialize(test, path);

                var clients = Serializer.Deserialize<List<Clients>>(path);

                var catpath = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(catpath);

                #region

                //var catpath = @"C:\POC\DeepXML\Categories.xml";
                //var categories = Serializer.Deserialize<List<Categories>>(catpath);

                //var corppath = @"C:\POC\DeepXML\Corporations.xml";
                //var corporations = Serializer.Deserialize<List<Corporation>>(corppath);

                //foreach (var client in clients)
                //{
                //    if (!string.IsNullOrWhiteSpace(client.CategoryName))
                //    {
                //        var cat = categories.FirstOrDefault(x => x.Name == client.CategoryName);
                //        client.CategoryName = cat.CategoryId.ToString();
                //    }

                //    if (!string.IsNullOrWhiteSpace(client.CorporationType))
                //    {
                //        var cat = corporations.FirstOrDefault(x => x.Name == client.CorporationType);
                //        client.CorporationType = cat.CorporationId.ToString();
                //    }

                //    client.Status = "active";
                //}


                //Serializer.Serialize(clients, path);
                #endregion

                foreach (var client in clients)
                {
                    if (!string.IsNullOrWhiteSpace(client.CategoryName))
                    {
                        var cat = categories.FirstOrDefault(x => x.CategoryId.ToString() == client.CategoryName);
                        client.CategoryName = cat.Name;
                    }
                }

                return clients;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet("clients/{id}")]
        public Clients GetClients(Guid id)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Clients.xml";
                var clients = Serializer.Deserialize<List<Clients>>(path);
                var clientsById = clients.FirstOrDefault(x => x.ClientId == id);

                var catpath = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(catpath);

                var corppath = @"C:\POC\DeepXML\Corporations.xml";
                var corporations = Serializer.Deserialize<List<Corporation>>(corppath);


                if (!string.IsNullOrWhiteSpace(clientsById.CategoryName))
                {
                    var cat = categories.FirstOrDefault(x => x.CategoryId.ToString() == clientsById.CategoryName);
                    clientsById.CategoryName = cat.Name;
                }

                if (!string.IsNullOrWhiteSpace(clientsById.CorporationType))
                {
                    var cat = corporations.FirstOrDefault(x => x.CorporationId.ToString() == clientsById.CorporationType);
                    clientsById.CorporationType = cat.Name;
                }


                return clientsById;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpPost("create-clients")]
        public void CreateClients(Clients client)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Clients.xml";
                var clients = Serializer.Deserialize<List<Clients>>(path);


                var catpath = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(catpath);

                var corppath = @"C:\POC\DeepXML\Corporations.xml";
                var corporations = Serializer.Deserialize<List<Corporation>>(corppath);


                clients.Add(new Clients
                {
                    ClientId = Guid.NewGuid(),
                    ClientName = client.ClientName,
                    CorporationType = !string.IsNullOrWhiteSpace(client.CorporationType) ? corporations.FirstOrDefault(x => x.Name == client.CorporationType)?.CorporationId.ToString() : "",
                    AdditionalNotes = client.AdditionalNotes,
                    Address = client.Address,
                    Business = client.Business,
                    CompanyKey = client.CompanyKey,
                    CompanyName = client.CompanyName,
                    CorporationKey = client.CompanyKey,
                    CRAPassword = client.CRAPassword,
                    CRAUserId = client.CRAUserId,
                    Email = client.Email,
                    HSTPeriod = client.HSTPeriod,
                    IncorporationDate = client.IncorporationDate,
                    IncorporationMonth = client.IncorporationMonth,
                    Notes = client.Notes,
                    OntarioOneKeyPassword = client.OntarioOneKeyPassword,
                    OntarioOneKeyUser = client.OntarioOneKeyUser,
                    PhoneNumber = client.PhoneNumber,
                    SerialNumber = client.SerialNumber,
                    Status = client.Status,
                    YearEnd = client.YearEnd,
                    CategoryName = !string.IsNullOrWhiteSpace(client.CategoryName) ? categories.FirstOrDefault(x => x.Name == client.CategoryName)?.CategoryId.ToString() : ""
                });

                Serializer.Serialize(clients, path);

                var auditLogspath = @"C:\POC\DeepXML\AuditLogs.xml";
                var auditLogs = Serializer.Deserialize<List<AuditLogs>>(auditLogspath);

                var auditLog = new AuditLogs
                {
                    Action = "Create",
                    AuditLogId = Guid.NewGuid(),
                    ChangedBy = System.Environment.MachineName,
                    ChangedDate = DateTime.Now,
                    Previous = "",
                    Updated = Newtonsoft.Json.JsonConvert.SerializeObject(client)
                };

                if (auditLogs == null)
                    auditLogs = new List<AuditLogs>();

                auditLogs.Add(auditLog);
                Serializer.Serialize(auditLogs, auditLogspath);

            }
            catch (Exception ex)
            {

            }
        }

        [HttpPut("edit-clients/{id}")]
        public void EditClients(Guid id, Clients client)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Clients.xml";
                var clients = Serializer.Deserialize<List<Clients>>(path);

                var clientDB = clients.FirstOrDefault(x => x.ClientId == id);

                var auditLog = new AuditLogs
                {
                    Action = "Edit",
                    AuditLogId = Guid.NewGuid(),
                    ChangedBy = System.Environment.MachineName,
                    ChangedDate = DateTime.Now,
                    Previous = Newtonsoft.Json.JsonConvert.SerializeObject(clientDB),
                    Updated = Newtonsoft.Json.JsonConvert.SerializeObject(client),
                    ClientId = id.ToString()
                };

                var catpath = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(catpath);

                var corppath = @"C:\POC\DeepXML\Corporations.xml";
                var corporations = Serializer.Deserialize<List<Corporation>>(corppath);

                if (clientDB != null)
                {
                    clientDB.CorporationType = !string.IsNullOrWhiteSpace(client.CorporationType) ? corporations.FirstOrDefault(x => x.Name == client.CorporationType)?.CorporationId.ToString() : "";

                    clientDB.CategoryName = !string.IsNullOrWhiteSpace(client.CategoryName) ? categories.FirstOrDefault(x => x.Name == client.CategoryName)?.CategoryId.ToString() : "";
                    clientDB.YearEnd = client.YearEnd;
                    clientDB.IncorporationDate = client.IncorporationDate;
                    clientDB.IncorporationMonth = client.IncorporationMonth;
                    clientDB.ClientName = client.ClientName;
                    clientDB.CompanyName = client.CompanyName;
                    clientDB.Address = client.Address;
                    clientDB.PhoneNumber = client.PhoneNumber;
                    clientDB.Business = client.Business;
                    clientDB.CorporationKey = client.CorporationKey;
                    clientDB.CompanyKey = client.CompanyKey;
                    clientDB.HSTPeriod = client.HSTPeriod;
                    clientDB.Email = client.Email;
                    clientDB.Status = client.Status;
                    clientDB.OntarioOneKeyUser = client.OntarioOneKeyUser;
                    clientDB.OntarioOneKeyPassword = client.OntarioOneKeyPassword;
                    clientDB.CRAUserId = client.CRAUserId;
                    clientDB.CRAPassword = client.CRAPassword;
                    clientDB.Notes = client.Notes;
                    clientDB.AdditionalNotes = client.AdditionalNotes;
                }

                Serializer.Serialize(clients, path);

                var auditLogspath = @"C:\POC\DeepXML\AuditLogs.xml";
                var auditLogs = Serializer.Deserialize<List<AuditLogs>>(auditLogspath);

                if (auditLogs == null)
                    auditLogs = new List<AuditLogs>();

                auditLogs.Add(auditLog);
                Serializer.Serialize(auditLogs, auditLogspath);

            }
            catch (Exception ex)
            {

            }
        }


        [HttpGet("clients-by-category")]
        public IEnumerable<Clients> GetClientsByCategoryId(string categoryId, string corporationId)
        {
            try
            {

                var path = @"C:\POC\DeepXML\Clients.xml";
                var clients = Serializer.Deserialize<List<Clients>>(path);

                if (categoryId == "all" && corporationId == "all")
                {
                    return clients;
                }

                if (categoryId != "all")
                {
                    //var categoryPath = @"C:\POC\DeepXML\Categories.xml";
                    //var categories = Serializer.Deserialize<List<Categories>>(categoryPath);

                    //var category = categories.FirstOrDefault(x => x.CategoryId.ToString() == categoryId);

                    //if (category != null)
                    //{
                    //clients = clients.Where(x => x.CategoryName == category.Name)?.ToList();
                    //}

                    clients = clients.Where(x => x.CategoryName == categoryId)?.ToList();
                }


                if (corporationId != "all")
                {

                    //var corporationPath = @"C:\POC\DeepXML\Corporations.xml";
                    //var corporations = Serializer.Deserialize<List<Corporation>>(corporationPath);

                    //var corporationById = corporations.FirstOrDefault(x => x.CorporationId.ToString() == corporationId);

                    //if (corporationById != null)
                    //{
                    //    clients = clients.Where(x => x.CorporationType == corporationById.Name)?.ToList();
                    //}

                    clients = clients.Where(x => x.CorporationType == corporationId)?.ToList();
                }

                var catpath = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(catpath);

                foreach (var client in clients)
                {
                    if (!string.IsNullOrWhiteSpace(client.CategoryName))
                    {
                        var cat = categories.FirstOrDefault(x => x.CategoryId.ToString() == client.CategoryName);
                        client.CategoryName = cat.Name;
                    }
                }

                return clients;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet("audit-logs")]
        public IEnumerable<AuditLogs> GetAuditLogs()
        {
            try
            {
                var auditLogspath = @"C:\POC\DeepXML\AuditLogs.xml";
                var auditLogs = Serializer.Deserialize<List<AuditLogs>>(auditLogspath);
                return auditLogs;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet("audit-logs/{clientId}")]
        public IEnumerable<AuditLogs> GetAuditLogs(string clientId)
        {
            try
            {
                var auditLogspath = @"C:\POC\DeepXML\AuditLogs.xml";
                var auditLogs = Serializer.Deserialize<List<AuditLogs>>(auditLogspath);

                var logs = auditLogs.Where(x => x.ClientId == clientId);

                var auditLogsResponse = new List<AuditLogs>();

                foreach (var log in logs)
                {
                    var prev = Newtonsoft.Json.JsonConvert.DeserializeObject<Clients>(log.Previous);
                    var updated = Newtonsoft.Json.JsonConvert.DeserializeObject<Clients>(log.Updated);

                    List<Variance> rt = prev.DetailedCompare(updated);

                    foreach (var variance in rt)
                    {
                        if (variance.Prop != "ClientId")
                        {
                            auditLogsResponse.Add(new AuditLogs
                            {
                                Action = log.Action,
                                AuditLogId = log.AuditLogId,
                                ChangedBy = log.ChangedBy,
                                ChangedDate = log.ChangedDate,
                                ClientId = log.ClientId,
                                Previous = "Property: " + variance.Prop + ". Value: " + variance.valA,
                                Updated = "Property: " + variance.Prop + ". Value: " + variance.valB
                            });
                        }
                    }
                }

                return auditLogsResponse;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        [HttpGet("hst-period")]
        public IEnumerable<string> GetHSTPeriods()
        {
            try
            {
                var clientPath = @"C:\POC\DeepXML\Clients.xml";

                var clients = Serializer.Deserialize<List<Clients>>(clientPath);

                var hstListClient = clients.Select(x => x.HSTPeriod).ToList();

                var distinctHstPeriod = hstListClient.Distinct().ToList();

                return distinctHstPeriod.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost("create-return")]
        public void CreateReturn(ReturnManagementVM returnVM)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);

                ReturnManagement returnManagement = new ReturnManagement
                {
                    ReturnManagementId = Guid.NewGuid(),
                    HSTPeriod = new List<string> { returnVM.HSTPeriod },
                    ReturnManagementName = returnVM.ReturnManagementName,
                    ClientReturns = new List<ClientReturns>()
                };


                var clientPath = @"C:\POC\DeepXML\Clients.xml";

                var clients = Serializer.Deserialize<List<Clients>>(clientPath);


                var clientByHstPeriod = clients.Where(x => x.Status.ToLower() =="active").ToList();


                foreach (var client in clientByHstPeriod)
                {
                    returnManagement.ClientReturns.Add(new ClientReturns
                    {
                        Client = client,
                        Filed = "false"
                    });
                }

                returns.Add(returnManagement);

                Serializer.Serialize(returns, path);

                var auditLogspath = @"C:\POC\DeepXML\AuditLogs.xml";
                var auditLogs = Serializer.Deserialize<List<AuditLogs>>(auditLogspath);

                var auditLog = new AuditLogs
                {
                    Action = "CreateReturn",
                    AuditLogId = Guid.NewGuid(),
                    ChangedBy = System.Environment.MachineName,
                    ChangedDate = DateTime.Now,
                    Previous = "",
                    Updated = Newtonsoft.Json.JsonConvert.SerializeObject(returnVM)
                };

                if (auditLogs == null)
                    auditLogs = new List<AuditLogs>();

                auditLogs.Add(auditLog);
                Serializer.Serialize(auditLogs, auditLogspath);

            }
            catch (Exception ex)
            {

            }
        }

        [HttpGet("return")]
        public IEnumerable<ReturnManagementVM> GetReturns()
        {
            try
            {
                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);
                List<ReturnManagementVM> returnManagementVMList = new List<ReturnManagementVM>();


                foreach (var item in returns)
                {
                    returnManagementVMList.Add(new ReturnManagementVM
                    {
                        ReturnManagementName = item.ReturnManagementName,
                        HSTPeriod = string.Join(',', item.HSTPeriod),
                        ReturnManagementId = item.ReturnManagementId.ToString()
                    });

                }

                return returnManagementVMList;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpGet("return/{id}")]
        public ReturnManagementVM GetReturn(Guid id)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);
                

                var returnByID = returns.FirstOrDefault(x => x.ReturnManagementId .ToString() == id.ToString());

                if (returnByID != null)
                {
                    ReturnManagementVM returnManagementVM = new ReturnManagementVM
                    {
                        ReturnManagementId = id.ToString(),
                        HSTPeriod = returnByID.HSTPeriod.FirstOrDefault(),
                        ReturnManagementName = returnByID.ReturnManagementName
                    };

                    return returnManagementVM;
                }
                    

               

                return new ReturnManagementVM();
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        [HttpPut("edit-return/{id}")]
        public void EditReturn(Guid id, ReturnManagementVM returnVM)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);

                var returnByID = returns.FirstOrDefault(x => x.ReturnManagementId.ToString() == id.ToString());

                if (returnByID != null)
                {
                    returnByID.ReturnManagementName = returnVM.ReturnManagementName;
                }

                Serializer.Serialize(returns, path);

            }
            catch (Exception ex)
            {

            }
        }

        [HttpGet("return-detail/{id}")]
        public ReturnManagement GetReturnDetail(Guid id)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);


                var returnByID = returns.FirstOrDefault(x => x.ReturnManagementId.ToString() == id.ToString());



                if (returnByID != null)
                {
                    var catpath = @"C:\POC\DeepXML\Categories.xml";
                    var categories = Serializer.Deserialize<List<Categories>>(catpath);

                    foreach (var client in returnByID.ClientReturns)
                    {
                        if (!string.IsNullOrWhiteSpace(client.Client.CategoryName))
                        {
                            var cat = categories.FirstOrDefault(x => x.CategoryId.ToString() == client.Client.CategoryName);
                            client.Client.CategoryName = cat.Name;
                        }
                    }

                    return returnByID;
                }




                return new ReturnManagement();
            }
            catch (Exception ex)
            {

                return null;
            }
        }


        [HttpGet("return-detail-filed-edit/{id}/client/{clientId}/filed/{fileValue}")]
        public void EditFileClient(Guid id, string clientId, string fileValue)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);


                var returnByID = returns.FirstOrDefault(x => x.ReturnManagementId.ToString() == id.ToString());

                if (returnByID != null)
                {
                    var client = returnByID.ClientReturns.FirstOrDefault(x => x.Client.ClientId.ToString() == clientId);
                    if (client != null)
                    {
                        client.Filed = fileValue;
                    }
                }


                Serializer.Serialize(returns, path);


            }
            catch (Exception ex)
            {

            }
        }

        [HttpGet("return-fitler/{returnManagementId}")]
        public ReturnManagement GetReturnFilter(string returnManagementId, string categoryName, string hstPeriod, string filedStatus)
        {
            try
            {

                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);
                var returnById = returns.FirstOrDefault(x => x.ReturnManagementId.ToString() == returnManagementId); 

                if (returnById!= null && categoryName == "all" && hstPeriod == "all" && filedStatus == "all")
                {
                    return returnById;                }

                

                if (categoryName != "all")
                {
                    returnById.ClientReturns = returnById.ClientReturns.Where(x=>x.Client.CategoryName == categoryName).ToList();
                }


                if (hstPeriod != "all")
                {

                    returnById.ClientReturns = returnById.ClientReturns.Where(x => x.Client.HSTPeriod == hstPeriod).ToList();
                }

                if(filedStatus != "all")
                {
                    returnById.ClientReturns = returnById.ClientReturns.Where(x => x.Filed == filedStatus).ToList();
                }


                var catpath = @"C:\POC\DeepXML\Categories.xml";
                var categories = Serializer.Deserialize<List<Categories>>(catpath);

                foreach (var client in returnById.ClientReturns)
                {
                    if (!string.IsNullOrWhiteSpace(client.Client.CategoryName))
                    {
                        var cat = categories.FirstOrDefault(x => x.CategoryId.ToString() == client.Client.CategoryName);
                        client.Client.CategoryName = cat.Name;
                    }
                }

                return returnById;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet("generate-excel/{returnManagementId}")]
        public bool GetReturnFilter(string returnManagementId)
        {
            try
            {
                var path = @"C:\POC\DeepXML\Returns.xml";

                var returns = Serializer.Deserialize<List<ReturnManagement>>(path);
                var returnById = returns.FirstOrDefault(x => x.ReturnManagementId.ToString() == returnManagementId);

                //Serializer.SendEmail();

                //return false;

                return Serializer.generateExcelFile(returnById);


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}