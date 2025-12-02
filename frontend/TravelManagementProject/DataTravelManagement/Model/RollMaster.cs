using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTravelManagement.Model
{
    [Table("TMS_RollMaster")]
    public class RollMaster
    {
        [Key]                     
        public int RollID { get; set; }

        [Required]               
        [StringLength(50)]   
        public string RollName { get; set; } 
    }
}



