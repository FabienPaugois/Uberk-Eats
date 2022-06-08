using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Authentification.Models
{
    public partial class Userrole
    {
        public long Userid { get; set; }
        public long Roleid { get; set; }

        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}
