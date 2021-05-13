using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Province
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public City City { get; set; }
        [ForeignKey("CityId")]
        [Required]
        public int CityId { get; set; }
        public ICollection<District> Districts { get; set; }
        public ICollection<Street> Streets { get; set; }
        public ICollection<Motel> Motels { get; set; }
    }
}
