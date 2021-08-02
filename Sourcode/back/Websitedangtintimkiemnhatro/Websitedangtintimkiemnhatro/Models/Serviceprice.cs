using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Serviceprice
    {
        [Key]
        public int Id { get; set; }
        public string Typeofnew { get; set; }
        public string PriceDate { get; set; }
        public string PriceWeek { get; set; }
        public string PriceMonth { get; set; }
        public string PriceUpTop { get; set; }
        public string Date { get; set; }
    }
}
