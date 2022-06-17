using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authentification.Models
{
    public class AuthentifiedUser
    {
        public string jwtoken { get; set; }
        public User user { get; set; }
    }
}
