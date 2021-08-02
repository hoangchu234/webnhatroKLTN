using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Models;

namespace Websitedangtintimkiemnhatro.ViewModels
{
    public class MotelViewModel
    {
        public List<Motel> Motels { get; set; }
        public List<Image> Images { get; set; }
        public List<City> Cities { get; set; }
        public List<Province> Provinces { get; set; }
        public List<Detail> Details { get; set; }
        public List<Typeofnew> Typeofnews { get; set; }
    }
}
