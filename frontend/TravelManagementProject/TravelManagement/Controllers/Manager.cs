using DataTravelManagement.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicesTravelManagement.Services;

namespace TravelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Manager : ControllerBase
    {
        private readonly Service _service;

        public Manager(Service service)
        {
            _service = service;
        }


        [HttpPost("GetEmployeesByRptId")]
        public IActionResult GetEmployeesByManagerId(string ID)
        {
            var response = _service.GetEmployeesByRptId(ID);
            return Ok(response);
        }
        [HttpPost("TravelDetailByRptId")]
        public IActionResult TravelDetailByRptId(string id)
        {
            var response = _service.GetTravelDetailsByRptId(id);
            return Ok(response);
        }

        [HttpPost("InsertTravelDetail")]
        public IActionResult InsertTravelDetail([FromBody] List<TravelMaster> travel)
        {
            var response = _service.InsertTravelDetail(travel);
            return Ok(response);
        }
    }
}
