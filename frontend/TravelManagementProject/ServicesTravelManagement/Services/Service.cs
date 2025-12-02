using DataTravelManagement.Data;
using DataTravelManagement.DTOModel;
using DataTravelManagement.Model;
using ServicesTravelManagement.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesTravelManagement.Services
{
    public class Service : IRepository
    {

        private readonly RollMasterData _rollData;
        private readonly LoginMasterData _LoginData;
        private readonly EmployeeMasterData _EmployeeData;
        private readonly TravelMasterData _TravelData;




        public Service(RollMasterData rollData, LoginMasterData LoginData, EmployeeMasterData EmployeeData, TravelMasterData TravelData)
        {
            _rollData = rollData;
            _LoginData = LoginData;
            _EmployeeData = EmployeeData;
            _TravelData = TravelData;
        }


         public Response<List<RollMaster>> GetRollMasterData()
        {
            var rolls = _rollData.GetAllRolls();

            return new Response<List<RollMaster>>
            {
                Status = rolls == null ? "Technical Failure" : "Success",
                Result = rolls
            };
        }

        public Response<int> ValidateLogin(string username, string password)
        {
            var user = _LoginData.GetByIdorEmail(username);
            return new Response<int> {

                Status = user != null && user.Password == password ? "Success" : "Functional Failure",
                Result = user == null || user.Password != password ?  0 : user.RefRoleId
            };

        }

        public Response<Employee> GetEmployee(string id)
        {
            var emp = _EmployeeData.GetByIdorEmail(id);
            var employee=new Employee
            {
                EmpId = emp.EmpId,
                Name = emp.Name,
                Email = emp.Email,
                RptEmpId = emp.RptEmpId
            };
            return new Response<Employee>
            {
                Status = employee == null ? "Functional Failure" : "Success",
                Result = employee
            };

        }

        public Response<List<EmployeeByRptId>> GetEmployeesByRptId(string ID)
        {
            var employees = _EmployeeData.GetEmployeesByRptId(ID);
            var emp = new List<EmployeeByRptId>();

            foreach (var e in employees)
            {
                emp.Add(new EmployeeByRptId
                {
                    EmpId = e.EmpId,
                    Name = e.Name,
                    Email = e.Email
                });
            }

            return new Response<List<EmployeeByRptId>>
            {
                Status = emp == null || emp.Count == 0 ? "Functional Failure" : "Success",
                Result = emp
            };
        }

        public Response<TravelMaster> GetTravelDetailsByEmpId(string empId)
        {
            var travels = _TravelData.GetTravelDetailByEmpId(empId);
            return new Response<TravelMaster>
            {
                Status = travels == null  ? "Functional Failure" : "Success",
                Result = travels
            };
        }
        
             public Response<List<TravelMaster>> GetTravelDetailsByRptId(string empId)
        {
            var travels = _TravelData.GetTravelDetailByRptId(empId);
            return new Response<List<TravelMaster>>
            {
                Status = travels == null || travels.Count==0 ? "Functional Failure" : "Success",
                Result = travels
            };
        }

        public Response<string> InsertTravelDetail(List<TravelMaster> travel)
        {

            var result = _TravelData.InsertTravelDetail(travel);
            return new Response<string>
            {
                Status = result == "Inserted" ? "Success" : "Functional Failure",
                Result = result
            };

        }

        public Response<string> UpdateTravelStatus(string empId, int status)
        {
            var result=_TravelData.UpdateTravelStatus(empId, status);
            return new Response<string>
            {
                Status = result == "Updated" ? "Success" : "Functional Failure",
                Result = result
            };

        }
    }
}
