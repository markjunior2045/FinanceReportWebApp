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

        [HttpGet]
        [Route("BaseValues")]
        public IEnumerable<BaseValues> GetBaseValues(Guid accountId)
        {
            accountId = Guid.Parse("692d431e-2507-4d9c-875d-b268ff136932");

            BaseValues[] bv = { _financeService.GetBaseValues(accountId) };

            if (bv == null)
                return null;

            return bv.AsEnumerable();
        }
    }
}
