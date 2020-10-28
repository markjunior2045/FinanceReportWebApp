using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinanceReport.Service
{
    public class DatabaseConfig
    {
        protected readonly MySqlConnection Connection = new MySqlConnection("Server=localhost;Port=3306;Database=finance;Uid=root;Pwd='';");
        protected readonly MySqlCommand Command;
        protected MySqlDataReader DataReader;

        protected DatabaseConfig()
        {
            Command = Connection.CreateCommand();
        }

        public bool TestDatabaseConnection()
        {
            try
            {
                Connection.Open();
                Connection.Close();
                return true;
            }
            catch
            {
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
                return false;
            }
        }
    }
}
