using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class PriceSearch
    {
        [Key]
        public int Id { get; set; }
        public string NumberOne { get; set; }
        public string TypePriceOne { get; set; }
        public string NumberTwo { get; set; }
        public string TypePriceTwo { get; set; }

    }
}
