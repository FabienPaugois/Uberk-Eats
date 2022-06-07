using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Text;
using System.Collections.Generic;

namespace Authentification
{
    class Program
    {
        public static void Main()
        {
            Console.WriteLine(UpdateUser(new User() { Id = 0, Name = "Timothée", Surname = "Varlet", Mail = "asd@gmail.com", Phone = "0584865", Password = "mdpasd" }));
            Console.ReadLine();
        }

        public static string CreateAccount(User user)
        {
            // Database connection string
            SqlConnection cnn = new SqlConnection(@"Server=DESKTOP-TOD8MOS;Database=Uberk-Eats;Trusted_Connection=True;");

            // Check if an account already exists with this mail address
            cnn.Open();
            string checkIfMailUsed = $"SELECT * FROM USERS WHERE MAIL = @MAIL";
            SqlCommand cmd = new SqlCommand(checkIfMailUsed, cnn);
            SqlParameter Mail = new SqlParameter() { ParameterName = "@MAIL", Value = user.Mail };
            cmd.Parameters.Add(Mail);
            SqlDataReader reader = cmd.ExecuteReader();
            bool accountExists = reader.HasRows;
            cnn.Close();

            if (accountExists)
            {
                return "Error: An account already exists with this mail address";
            }
            else
            {
                // Create the account, using a SHA256 Hash for the password
                cnn.Open();
                string querystring = $"INSERT INTO USERS VALUES ('{user.Name}','{user.Surname}','{user.Mail}','{user.Phone}','{user.Password}')";
                new SqlCommand(querystring, cnn).ExecuteNonQuery();
                cnn.Close();
                return "Ok";
            }
        }

        public static User AuthenticateUser(User user)
        {
            SqlConnection cnn = new SqlConnection(@"Server=DESKTOP-TOD8MOS;Database=Uberk-Eats;Trusted_Connection=True;");
            cnn.Open();
            string queryString = $"SELECT USERS.NAME, USERS.MAIL, ROLES.ID, ROLES.NAME, USERS.ID FROM USERROLES INNER JOIN USERS on USERROLES.USERID = USERS.ID INNER JOIN ROLES on USERROLES.ROLEID = ROLES.ID WHERE Mail = @MAIL and Password = @PASSWORD";
            SqlCommand cmd = new SqlCommand(queryString, cnn);

            SqlParameter[] parameters = {
                new SqlParameter() { ParameterName = "@MAIL", Value = user.Mail },
                new SqlParameter() { ParameterName = "@PASSWORD", Value = user.Password }
            };
            cmd.Parameters.AddRange(parameters);

            DbDataReader reader = cmd.ExecuteReader();
            User userInfos = new User() { Roles = new List<Role>() };
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    userInfos.Name = (string)reader[0];
                    userInfos.Mail = (string)reader[1];
                    userInfos.Roles.Add(new Role() { Id = Convert.ToInt32(reader[2]), Name = (string)reader[3] });
                    userInfos.Id = Convert.ToInt32(reader[4]);
                }
            }
            cnn.Close();
            return userInfos;
        }

        public static string DeleteUser(User user)
        {
            SqlConnection cnn = new SqlConnection(@"Server=DESKTOP-TOD8MOS;Database=Uberk-Eats;Trusted_Connection=True;");
            cnn.Open();
            User userAuthenticated = AuthenticateUser(user);
            if (userAuthenticated.Id != 0) // Authentification
            {
                string querystring = $"DELETE FROM USERS WHERE ID = @ID";
                SqlCommand cmd = new SqlCommand(querystring, cnn);
                SqlParameter ID = new SqlParameter() { ParameterName = "@ID", Value = userAuthenticated.Id };
                cmd.Parameters.Add(ID);
                cmd.ExecuteNonQuery();
                return "Deleted";
            }
            else
            {
                return "Wrong password, couldn't delete account";
            }
        }


        public static string UpdateUser(User user)
        {
            SqlConnection cnn = new SqlConnection(@"Server=DESKTOP-TOD8MOS;Database=Uberk-Eats;Trusted_Connection=True;");
            cnn.Open();
            User authUser = AuthenticateUser(user);
            if (authUser.Id != 0) // Authentification
            {
                string querystring = $"UPDATE USERS SET NAME = @NAME, SURNAME = @SURNAME, PHONE = @PHONE WHERE MAIL = @MAIL";
                SqlCommand cmd = new SqlCommand(querystring, cnn);
                SqlParameter[] parameters = {
                new SqlParameter() { ParameterName = "@NAME", Value = user.Name },
                new SqlParameter() { ParameterName = "@SURNAME", Value = user.Surname },
                new SqlParameter() { ParameterName = "@PHONE", Value = user.Phone },
                new SqlParameter() { ParameterName = "@MAIL", Value = user.Mail },
                };
                cmd.Parameters.AddRange(parameters);

                cmd.ExecuteNonQuery();
                return "Updated";
            }
            else
            {
                return "Wrong password, couldn't update account";
            }
        }
    }
}