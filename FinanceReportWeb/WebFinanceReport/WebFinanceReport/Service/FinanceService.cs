using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebFinanceReport.Models;

namespace WebFinanceReport.Service
{
    public class FinanceService : DatabaseConfig
    {
        public bool InsertItem(Item item)
        {
            if (item == null)
            {
                return false;
            }

            try
            {
                Connection.Open();
                Command.Parameters.Clear();
                Command.CommandText = "INSERT INTO item (id, accountid,name, price, buydate) VALUES (@id,@accountid,@name,@price,@buydate)";
                Command.Parameters.AddWithValue("@id", Guid.NewGuid());
                Command.Parameters.AddWithValue("@accountid", item.AccountId);
                Command.Parameters.AddWithValue("@name", item.Name);
                Command.Parameters.AddWithValue("@price", item.Price);
                Command.Parameters.AddWithValue("@buydate", item.BuyDate);
                Command.ExecuteNonQuery();
                Connection.Close();
                return true;
            }
            catch (Exception error)
            {
                Console.WriteLine(error);
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
                return false;
            }
        }

        public bool UpdateItem(Item novoItem)
        {
            try
            {
                Connection.Open();
                Command.Parameters.Clear();
                Command.CommandText = "UPDATE item SET name = @name, price = @price, buydate = @buydate WHERE id = @id";
                Command.Parameters.AddWithValue("@id", novoItem.Id);
                Command.Parameters.AddWithValue("@name", novoItem.Name);
                Command.Parameters.AddWithValue("@price", novoItem.Price);
                Command.Parameters.AddWithValue("@buydate", novoItem.BuyDate);
                Command.ExecuteNonQuery();
                Connection.Close();
                return true;
            }
            catch (Exception error)
            {
                Console.WriteLine(error);
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
                return false;
            }
        }

        public bool DeleteItem(Item toDeleteItem)
        {
            try
            {
                Connection.Open();
                Command.Parameters.Clear();
                Command.CommandText = "DELETE FROM item WHERE id = @id";
                Command.Parameters.AddWithValue("@id", toDeleteItem.Id);
                Command.ExecuteNonQuery();
                Connection.Close();

                return true;

            }
            catch (Exception error)
            {
                Console.WriteLine(error);
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
                return false;
            }
        }
        public List<Item> GetAllItems(Guid accountId)
        {
            Item novoItem;
            List<Item> items = new List<Item>();

            try
            {
                Connection.Open();
                Command.Parameters.Clear();
                Command.CommandText = $"SELECT id, accountid, name, price, buydate FROM item WHERE accountid = '{accountId}' ORDER BY buydate";
                DataReader = Command.ExecuteReader();
                while (DataReader.Read())
                {
                    novoItem = new Item();
                    novoItem.Id = DataReader.GetGuid(0);
                    novoItem.AccountId = DataReader.GetGuid(1);
                    novoItem.Name = DataReader.GetString(2);
                    novoItem.Price = DataReader.GetDouble(3);
                    novoItem.BuyDate = DataReader.GetDateTime(4);
                    items.Add(novoItem);
                }
                Connection.Close();
            }
            catch (Exception error)
            {
                Console.WriteLine(error);
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
            }

            return items;
        }

        public bool SetNewAccountBaseValues(Guid accountId, double salary, double savePercentage)
        {
            savePercentage = savePercentage / 100;
            double available = (salary - (savePercentage * salary));
            try
            {
                Connection.Open();
                Command.CommandText = $"INSERT INTO salary VALUES ('{Guid.NewGuid()}','{accountId}',{salary},{available})";
                Command.ExecuteNonQuery();
                Connection.Close();

                return true;
            }
            catch (Exception error)
            {
                Console.WriteLine(error);
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
                return false;
            }

        }

        public BaseValues GetBaseValues(Guid accountId)
        {
            BaseValues baseValues = new BaseValues();
            try
            {
                Connection.Open();
                Command.CommandText = $"SELECT * FROM salary WHERE accountid = '{accountId}'";
                DataReader = Command.ExecuteReader();
                DataReader.Read();
                baseValues.Salary = DataReader.GetDouble(2);
                baseValues.SalaryAvailable = DataReader.GetDouble(3);
                Connection.Close();

                Connection.Open();
                Command.CommandText = $"SELECT price FROM item WHERE accountId = '{accountId}'";
                DataReader = Command.ExecuteReader();
                while (DataReader.Read())
                    baseValues.TotalSpent += DataReader.GetDouble(0);
                Connection.Close();

                baseValues.TotalAvailable = baseValues.SalaryAvailable - baseValues.TotalSpent;

                return baseValues;
            }
            catch
            {
                return null;
            }
        }
    }
}
