using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class New
    {
        [Key]
        public int Id { get; set; }
        public string NewName { get; set; }
    }
}
