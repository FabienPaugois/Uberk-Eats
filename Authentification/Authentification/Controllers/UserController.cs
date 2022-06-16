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
using Microsoft.EntityFrameworkCore;
using Authentification.Services;
using Microsoft.Extensions.Configuration;

namespace Authentification.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UberkEatsContext db;
        private IConfiguration _config;


        public UserController(IConfiguration config)
        {
            db = new UberkEatsContext();
            _config = config;
        }
        
        [HttpGet]
        public string Get()
        {
            return "API is working";
        }

        #region Authenticate
        [HttpPost]
        [Route("/Authenticate")]
        public ContentResult Authenticate(User user)
        {

            // Check if a user with this mail&password exists & get his roles
            User userAuth = db.User.Include(a=> a.UserRole).ThenInclude(b=> b.Role).Where(a => a.Mail == user.Mail && a.Password == user.Password).FirstOrDefault();
            if (userAuth != null)
            {
                List<Role> roles = new List<Role>();
                foreach (UserRole userRole in userAuth.UserRole)
                {
                    roles.Add(userRole.Role);
                }

                // Token generation
                JwtService jwt = new JwtService(_config);
                string token = jwt.GenerateSecurityToken(userAuth.Mail, roles);
                userAuth.UserRole = null;
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject(new AuthentifiedUser() { user = userAuth, jwtoken = token }),
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
        public ContentResult Create(RegisterForm registerForm)
        {
            User authenticated = db.User.FirstOrDefault(a => a.Mail == registerForm.User.Name);
            Role roleToAssign = db.Role.FirstOrDefault(b => b.Name == registerForm.RoleName);
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
                db.User.Add(registerForm.User);
                db.SaveChanges();
                db.UserRole.Add(new UserRole() { UserId = registerForm.User.Id, RoleId = roleToAssign.Id });
                db.SaveChanges();

                // Token generation
                JwtService jwt = new JwtService(_config);
                string token = jwt.GenerateSecurityToken(registerForm.User.Mail, new List<Role>() { roleToAssign });
                registerForm.User.UserRole = null;

                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject(new AuthentifiedUser() { user = registerForm.User, jwtoken = token }),
                    ContentType = "application/json",
                    StatusCode = 201
                };
            }
        }
        #endregion
    }
}
