using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authentification.Models
{
    public class UserBan
    {
        public string Mail { get; set; }
        public bool IsSuspended { get; set; }
    }
}
