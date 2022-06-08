using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Authentification.Models;
using Microsoft.Data.SqlClient;
using System.Data.Common;

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


        [HttpPost]
        [Route("/Authenticate")]
        public User Authenticate(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail && a.Password == user.Password);
            if(authenticated != null)
            {
                return authenticated;
            }
            else
            {
                return user;
            }
        }

        [HttpPost]
        [Route("/Delete")]
        public string Delete(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail && a.Password == user.Password);
            if (authenticated != null)
            {
                db.User.Remove(authenticated);
                db.SaveChanges();
                return "Deleted";
            }
            else
            {
                return "Password or mail error";
            }
        }

        [HttpPost]
        [Route("/Update")]
        public string Update(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail && a.Password == user.Password);
            if (authenticated != null)
            {
                user.Id = authenticated.Id;
                db.Entry(authenticated).CurrentValues.SetValues(user);
                db.SaveChanges();
                return "Updated";
            }
            else
            {
                return "Password or mail error";
            }
        }

        [HttpPost]
        [Route("/Create")]
        public string Create(User user)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == user.Mail);
            if (authenticated != null)
            {
                return "Mail address already used";
            }
            else
            {
                user.Id = 0;
                db.User.Add(user);
                db.SaveChanges();
                return "Account Created";
            }
        }
    }
}
