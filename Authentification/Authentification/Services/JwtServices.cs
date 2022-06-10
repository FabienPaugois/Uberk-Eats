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
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);

            ClaimsIdentity Subject = new ClaimsIdentity(new[]
            {
                    new Claim(ClaimTypes.Email, user.Mail),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.MobilePhone, user.Phone),
                });
            Roles.ForEach(delegate (Role role) { Subject.AddClaim( new Claim(ClaimTypes.Role, role.Name)); });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDate)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}