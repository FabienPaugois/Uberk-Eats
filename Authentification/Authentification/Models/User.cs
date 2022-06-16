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
            InverseUserAffiliateNavigation = new HashSet<User>();
            UserRole = new HashSet<UserRole>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Mail { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public long? UserAffiliate { get; set; }
        public virtual User UserAffiliateNavigation { get; set; }
        public virtual ICollection<User> InverseUserAffiliateNavigation { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
