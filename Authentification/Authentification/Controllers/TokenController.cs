using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Authentification.Models;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Authentification.Services;

namespace Authentification.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private IConfiguration _config;

        public TokenController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public string GetRandomToken()
        {
            var jwt = new JwtService(_config);
            var token = jwt.GenerateSecurityToken(new User() { Name="Tim", Mail="tv@gmail.com", Phone="5089961256" }, new List<Role>() { new Role() { Name = "Chef" } });
            return token;
        }

    }
}