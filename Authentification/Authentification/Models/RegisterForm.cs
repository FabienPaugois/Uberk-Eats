using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authentification.Models
{
    public class RegisterForm
    {
        public User User { get; set; }
        public string RoleName { get; set; }
        public string AffiliateMail { get; set; }
    }
}
