using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Authentification.Models;
using Microsoft.Data.SqlClient;
using System.Data.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Newtonsoft.Json;

namespace Authentification.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UberkEatsContext db;

        public UserController()
        {
            db = new UberkEatsContext();
        }
        
        [HttpGet]
        public string Get()
        {
            return "API is working";
        }

        #region Authenticate
        [HttpPost]
        [Route("/Authenticate")]
        public User Authenticate(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail && a.Password == user.Password);
            if (authenticated != null)
            {
                return authenticated;
            }
            else
            {
                return user;
            }
        }
        #endregion

        #region Delete
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/Delete")]
        public ContentResult Delete(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail && a.Password == user.Password);
            if (authenticated != null)
            {
                db.User.Remove(authenticated);
                db.SaveChanges();
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Account created"),
                    ContentType = "application/json",
                    StatusCode = 201
                };
            }
            else
            {
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Password or mail error"),
                    ContentType = "application/json",
                    StatusCode = 400
                };
            }
        }
        #endregion

        #region Update
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/Update")]
        public ContentResult Update(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail && a.Password == user.Password);
            if (authenticated != null)
            {
                user.Id = authenticated.Id;
                db.Entry(authenticated).CurrentValues.SetValues(user);
                db.SaveChanges();
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Account created"),
                    ContentType = "application/json",
                    StatusCode = 201
                };
            }
            else
            {
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Password or mail error"),
                    ContentType = "application/json",
                    StatusCode = 400
                };
            }
        }
        #endregion

        #region Create
        [HttpPost]
        [Route("/Create")]
        public ContentResult Create(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail);
            if (authenticated != null)
            {
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Mail already used"),
                    ContentType = "application/json",
                    StatusCode = 400
                };
            }
            else
            {
                user.Id = 0;
                db.User.Add(user);
                db.SaveChanges();
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Account created"),
                    ContentType = "application/json",
                    StatusCode = 201
                };
            }
        }
        #endregion
    }
}
