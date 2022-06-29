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
            User userAuth = db.User.Include(a => a.UserRole).ThenInclude(b => b.Role).Where(a => a.Mail == user.Mail && a.Password == user.Password).FirstOrDefault();
            if (userAuth.IsSuspended)
            {
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("You have been banned, if you want to contest your sanction, please contact our support."),
                    ContentType = "application/json",
                    StatusCode = 401
                };
            }
            else if (userAuth != null)
            {
                List<Role> roles = new List<Role>();
                foreach (UserRole userRole in userAuth.UserRole)
                {
                    roles.Add(userRole.Role);
                }

                // Token generation
                JwtService jwt = new JwtService(_config);
                string token = jwt.GenerateSecurityToken(userAuth, roles);
                // Remove userRole to avoid json looping & remove password from the returned object
                userAuth.UserRole = null;
                userAuth.Password = null;
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
                    StatusCode = 401
                };
            }
        }
        #endregion

        #region Delete
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/Delete")]
        public ContentResult Delete(RegisterForm userToDelete)
        {
            // Authenticate the user before authorizing him to delete his account
            User authenticated = new User();
            if (userToDelete.User.Password == "")
                authenticated = db.User.FirstOrDefault(a => a.Mail == userToDelete.User.Mail);
            else
                authenticated = db.User.FirstOrDefault(a => a.Mail == userToDelete.User.Mail && a.Password == userToDelete.User.Password);
            if (authenticated != null)
            {
                db.User.Remove(authenticated);
                db.SaveChanges();
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Account deleted"),
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
        public ContentResult Update(RegisterForm registerForm)
        {
            User authenticated = new User();
            if (registerForm.User.Password == "")
                authenticated = db.User.FirstOrDefault(a => a.Mail == registerForm.User.Mail);
            else
                authenticated = db.User.FirstOrDefault(a => a.Mail == registerForm.User.Mail && a.Password == registerForm.User.Password);
            if (authenticated != null)
            {
                registerForm.User.Id = authenticated.Id;
                registerForm.User.IsSuspended = authenticated.IsSuspended;
                db.Entry(authenticated).CurrentValues.SetValues(registerForm.User);
                db.SaveChanges();
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject(registerForm.User),
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

        #region UpdateBan
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/BanUser")]
        public ContentResult BanUser(UserBan userBan)
        {
            User authenticated = new User();
            authenticated = db.User.FirstOrDefault(a => a.Mail == userBan.Mail);
            if (authenticated != null)
            {
                authenticated.IsSuspended = userBan.IsSuspended;
                db.User.Attach(authenticated);
                db.Entry(authenticated).Property(x => x.IsSuspended).IsModified = true;
                db.SaveChanges();
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("User has been banned"),
                    ContentType = "application/json",
                    StatusCode = 201
                };
            }
            else
            {
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Mail error"),
                    ContentType = "application/json",
                    StatusCode = 400
                };
            }
        }
        #endregion

        #region Create
        [HttpPost]
        [Route("/Create")]
        public async Task<ContentResult> CreateAsync(RegisterForm registerForm)
        {
            // Checks if the account to create already exists
            User authenticated = await db.User.FirstOrDefaultAsync(a => a.Mail == registerForm.User.Name);
            // Get the roleId to assign
            Role roleToAssign = await db.Role.FirstOrDefaultAsync(b => b.Name == registerForm.RoleName);

            if (registerForm.AffiliateMail != "") // If the user asks for an affiliate account
            {
                User getAffiliate = await db.User
                    .Include(a => a.UserRole)
                    .ThenInclude(b => b.Role)
                    .FirstOrDefaultAsync(a => a.Mail == registerForm.AffiliateMail);

                if (getAffiliate != null) // If the affiliate account exists 
                {
                    if (db.User.Any(d => d.UserAffiliate == getAffiliate.Id)) // Check if the affiliate account is already used
                    {
                        return new ContentResult()
                        {
                            Content = "Sponsor already used !",
                            ContentType = "application/json",
                            StatusCode = 400
                        };
                    }
                    else
                    {
                        // Checks if the affiliate account has the asked role
                        if (!getAffiliate.UserRole.Any(f => f.RoleId == roleToAssign.Id))
                        {
                            return new ContentResult()
                            {
                                Content = "Your sponsor must have the same role as you !",
                                ContentType = "application/json",
                                StatusCode = 400
                            };
                        }
                        registerForm.User.UserAffiliate = getAffiliate.Id;
                    }
                }
                else
                {
                    return new ContentResult()
                    {
                        Content = "Sponsor does not exist !",
                        ContentType = "application/json",
                        StatusCode = 400
                    };
                }
            }

            if (authenticated != null)
            {
                return new ContentResult()
                {
                    Content = "Mail already used",
                    ContentType = "application/json",
                    StatusCode = 400
                };
            }
            else
            {
                registerForm.User.IsSuspended = false;
                db.User.Add(registerForm.User);
                db.SaveChanges();
                db.UserRole.Add(new UserRole() { UserId = registerForm.User.Id, RoleId = roleToAssign.Id });
                db.SaveChanges();

                // Token generation
                JwtService jwt = new JwtService(_config);
                string token = jwt.GenerateSecurityToken(registerForm.User, new List<Role>() { roleToAssign });

                // Remove userRole to avoid json looping & remove password from the returned object
                registerForm.User.UserRole = null;
                registerForm.User.Password = null;
                registerForm.User.UserAffiliateNavigation = null;

                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject(new AuthentifiedUser() { user = registerForm.User, jwtoken = token }),
                    ContentType = "application/json",
                    StatusCode = 201
                };
            }
        }
        #endregion

        #region GetAllUsers
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/AllUsers")]
        public ContentResult AllUsers()
        {
            List<User> users = db.User.Select(p => new User()
            {
                Id = p.Id,
                Name = p.Name,
                Surname = p.Surname,
                Phone = p.Phone,
                IsSuspended = p.IsSuspended,
                Mail = p.Mail
            }).ToList();
            if (users.Count() > 0)
            {
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject(users),
                    ContentType = "application/json",
                    StatusCode = 200
                };
            }
            else
            {
                return new ContentResult()
                {
                    Content = JsonConvert.SerializeObject("Password or mail error"),
                    ContentType = "application/json",
                    StatusCode = 401
                };
            }
        }
        #endregion

    }
}
