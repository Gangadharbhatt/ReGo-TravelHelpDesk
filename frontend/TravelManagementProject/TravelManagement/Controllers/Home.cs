using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicesTravelManagement.Services;

namespace TravelManagement.Controllers
{
    [Route("api")]
    [ApiController]
    public class Home : ControllerBase
    {

        private readonly Service _service;

        public Home(Service service)
        {
            _service = service;
        }

        [HttpGet("GetRollMaster")]
        public IActionResult GetRollMaster()
        {

            var response = _service.GetRollMasterData();
            return Ok(response);
        }

        [HttpPost("LoginRequest")]
        public IActionResult LoginRequest(string username,string password)
        {
            var response = _service.ValidateLogin(username, password);
            return Ok(response);
        }

        [HttpPost("UpdateTravelStatus")]
        public IActionResult UpdateTravelStatus(string empId, int status)
        {
            var response = _service.UpdateTravelStatus(empId, status);
            return Ok(response);

        }

    }
}
