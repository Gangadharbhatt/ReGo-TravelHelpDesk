using DataTravelManagement.DTOModel;
using DataTravelManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesTravelManagement.Repository
{
    public interface IRepository
    {
        public Response<List<RollMaster>> GetRollMasterData();
        public Response<int> ValidateLogin(string username, string password);
        public Response<Employee> GetEmployee(string id);
        public Response<List<EmployeeByRptId>> GetEmployeesByRptId(string ID);

        public Response<TravelMaster> GetTravelDetailsByEmpId(string empId);

        public Response<List<TravelMaster>> GetTravelDetailsByRptId(string empId);
        public Response<string> InsertTravelDetail(List<TravelMaster> travel);

        public Response<string> UpdateTravelStatus(string empId, int status);
    }
}
