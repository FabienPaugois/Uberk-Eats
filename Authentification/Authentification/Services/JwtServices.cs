using System;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Authentification.Models;
using System.Collections.Generic;

namespace Authentification.Services
{
    public class JwtService
    {
        private readonly string _secret;
        private readonly string _expDate;

        public JwtService(IConfiguration config)
        {
            _secret = config.GetSection("JwtConfig").GetSection("secret").Value;
            _expDate = config.GetSection("JwtConfig").GetSection("expirationInMinutes").Value;
        }

        public string GenerateSecurityToken(User user, List<Role> Roles)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_secret);

            // Create the token payload
            ClaimsIdentity Subject = new ClaimsIdentity(new[]
            {
                    new Claim("name", user.Name),
                    new Claim("surname", user.Surname),
                    new Claim("email", user.Mail),
                    new Claim("phone", user.Phone),
                    //new Claim("IdAffiliate", user.UserAffiliate)
                });
            Roles.ForEach(delegate (Role Role) { Subject.AddClaim( new Claim(ClaimTypes.Role, Role.Name)); });

            // Token header
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDate)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Subject = Subject
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}