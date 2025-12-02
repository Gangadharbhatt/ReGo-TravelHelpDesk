using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicesTravelManagement.Services;

namespace TravelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Employee : ControllerBase
    {
        private readonly Service _service;

        public Employee(Service service)
        {
            _service = service;
        }

        [HttpPost("GetEmployeeData")]
        public IActionResult GetEmployeeData(string IDorEmail)
        {
            var response = _service.GetEmployee(IDorEmail);
            return Ok(response);
        }
        [HttpPost("TravelDetailByEmpId")]
        public IActionResult TravelDetailByEmpId(string id)
        {
            var response = _service.GetTravelDetailsByEmpId(id);
            return Ok(response);
        }
    }
}
