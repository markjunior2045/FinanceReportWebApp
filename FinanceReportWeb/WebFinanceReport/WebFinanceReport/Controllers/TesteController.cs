using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinanceReport.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TesteController : ControllerBase
    {
        protected readonly MySqlConnection Connection = new MySqlConnection("Server=localhost;Port=3306;Database=finance;Uid=root;Pwd='';");
        protected readonly MySqlCommand Command;
        protected MySqlDataReader DataReader;

        public TesteController()
        {
            Command = Connection.CreateCommand();
        }

        [HttpGet]
        [Route("Name")]
        public IEnumerable<string> Get()
        {
            string[] name = { "Não foi" };
            try
            {
                Connection.Open();
                Command.Parameters.Clear();
                Command.CommandText = $"SELECT username FROM account";
                DataReader = Command.ExecuteReader();
                while (DataReader.Read())
                {
                    name[0] = DataReader.GetString(0);
                }
                Connection.Close();
            }
            catch(Exception error)
            {
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
            }

            return name.AsEnumerable();
        }
    }
}
