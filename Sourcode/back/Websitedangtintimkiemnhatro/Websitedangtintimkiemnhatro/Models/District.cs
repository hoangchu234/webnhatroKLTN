using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Websitedangtintimkiemnhatro.Models
{
    public class District
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
