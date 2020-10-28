using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinanceReport.Models
{
    public class Item
    {
        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public DateTime BuyDate { get; set; }

        public Item()
        {
        }

        public Item(Guid id, Guid accountId, string name, double price, DateTime buyDate)
        {
            Id = id;
            AccountId = accountId;
            Name = name;
            Price = price;
            BuyDate = buyDate;
        }
    }
}
