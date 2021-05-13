using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Street
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public Province Province { get; set; }
        [ForeignKey("ProvinceId")]
        [Required]
        public int ProvinceId { get; set; }
        public ICollection<Motel> Motels { get; set; }
    }
}
