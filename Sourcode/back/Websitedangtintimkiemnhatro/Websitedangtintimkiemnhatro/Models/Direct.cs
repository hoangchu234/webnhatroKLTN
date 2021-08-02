using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Direct
    {
        [Key]
        public int Id { get; set; }
        public string DirectName { get; set; }
    }
}
