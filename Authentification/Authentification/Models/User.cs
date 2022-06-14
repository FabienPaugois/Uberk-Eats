using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Authentification.Models
{
    public partial class User
    {
        public User()
        {
            InverseUseraffiliateNavigation = new HashSet<User>();
            Userrole = new HashSet<Userrole>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Mail { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public long? Useraffiliate { get; set; }

        public virtual User UseraffiliateNavigation { get; set; }
        public virtual ICollection<User> InverseUseraffiliateNavigation { get; set; }
        public virtual ICollection<Userrole> Userrole { get; set; }
    }
}
