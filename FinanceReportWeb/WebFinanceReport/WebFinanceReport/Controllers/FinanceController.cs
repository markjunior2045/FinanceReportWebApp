using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebFinanceReport.Models;
using WebFinanceReport.Service;

namespace WebFinanceReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanceController : ControllerBase
    {
        FinanceService _financeService = new FinanceService();
        private Guid _AccountId = Guid.Parse("692d431e-2507-4d9c-875d-b268ff136932");

        [HttpGet]
        [Route("BaseValues")]
        public IEnumerable<BaseValues> GetBaseValues(Guid accountId)
        {
            accountId = _AccountId;

            BaseValues[] baseValues = { _financeService.GetBaseValues(accountId) };

            if (baseValues == null)
                return null;

            return baseValues.AsEnumerable();
        }

        [HttpGet]
        [Route("AllItems")]
        public IEnumerable<Item> GetAllItems(Guid accountId)
        {
            accountId = _AccountId;

            List<Item> items = _financeService.GetAllItems(accountId);

            if (items == null)
                return null;

            return items.AsEnumerable();
        }
    }
}
