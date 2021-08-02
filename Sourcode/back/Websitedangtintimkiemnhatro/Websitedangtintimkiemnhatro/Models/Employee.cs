using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string HovaTen { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastLogOnDate { get; set; }
        public string Email { get; set; }
        public bool Gender { get; set; }
        public string EmployeeImage { get; set; }
        public DateTime Birthday { get; set; }
        public string Phone { get; set; }
        public string AddressOne { get; set; }
        public string AddressTwo { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public Account Account { get; set; }
        [ForeignKey("AccountId")]
        [Required]
        public int AccountId { get; set; }
        public Employee ManageEmployee { get; set; }
        public int? ManageEmployeeId { get; set; }
        public ICollection<Employee> ChildManageEmployees { get; set; }
    }
}
