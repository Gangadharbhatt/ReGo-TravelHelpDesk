using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataTravelManagement.Model
{
    public class Response<T>
    {
        public string Status { get; set; }
        public T Result { get; set; }
    }
}
