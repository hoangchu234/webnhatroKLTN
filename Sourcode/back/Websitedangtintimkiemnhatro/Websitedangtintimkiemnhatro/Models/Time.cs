using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Time
    {
        [Key]
        public int Id { get; set; }
        public string TimeName { get; set; }
        public ICollection<ChangeTime> ChangeTimes { get; set; }
    }
}
