using System;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

namespace Authentification
{
    class Program
    {
        public static void Main()
        {
            Console.WriteLine(CreateAccount(new User() { Id = 1, Name = "Timothée", Surname = "Varlet", Mail = "tv@gmail.com", Phone = "0584865", Password = "mdptv" }));
        }
        public static string CreateAccount(User user)
        {
            // Database connection string
            string connectionString = @"Server=DESKTOP-TOD8MOS;Database=Uberk-Eats;Trusted_Connection=True;";
            SqlConnection cnn;
            cnn = new SqlConnection(connectionString);

            // Check if an account already exists with this mail address
            cnn.Open();
            string checkIfMailUsed = $"SELECT * FROM USERS WHERE Mail = '{user.Mail}'";
            SqlCommand commandCheck = new SqlCommand(checkIfMailUsed, cnn);
            SqlDataReader reader = commandCheck.ExecuteReader();
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
                using SHA256 sha256Hash = SHA256.Create();
                string querystring = $"INSERT INTO USERS VALUES ('{user.Name}','{user.Surname}','{user.Mail}','{user.Phone}','{GetHash(sha256Hash, user.Password)}')";
                SqlCommand commandInsert = new SqlCommand(querystring, cnn);
                commandInsert.ExecuteNonQuery();
                cnn.Close();
                return "Ok";
            }
        }

        private static string GetHash(HashAlgorithm hashAlgorithm, string input)
        {
            // Convert the input string to a byte array and compute the hash.
            byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

    }
}
