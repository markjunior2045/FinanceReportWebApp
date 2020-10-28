using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinanceReport.Models
{
    public class BaseValues
    {
        public double TotalSpent { get; set; }
        public double TotalAvailable { get; set; }
        public double Salary { get; set; }
        public double SalaryAvailable { get; set; }

        public BaseValues(double totalSpent, double totalAvailable, double salary, double salaryAvailable)
        {
            TotalSpent = totalSpent;
            TotalAvailable = totalAvailable;
            Salary = salary;
            SalaryAvailable = salaryAvailable;
        }

        public BaseValues()
        {
        }
    }
}
