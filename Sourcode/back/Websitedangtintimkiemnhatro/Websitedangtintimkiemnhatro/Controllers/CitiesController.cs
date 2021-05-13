using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Websitedangtintimkiemnhatro.Models;
using Websitedangtintimkiemnhatro.ViewModels;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCitys()
        {
            return await _context.Citys.ToListAsync();
        }

        // GET: api/List
        [HttpGet]
        [Route("GetLists")]
        public async Task<ActionResult<Object>> GetLists()
        {
            List<ListsViewModel> list = new List<ListsViewModel>();
            var cities = _context.Citys.Skip(1).Select(a => new ListsViewModel() { Name = a.Name}).ToList();
            list.AddRange(cities);
            var provinces = _context.Provinces.Include(a => a.City).Skip(1).Select(a => new ListsViewModel() { Name = a.Name + ", " + a.City.Name }).ToList();
            list.AddRange(provinces);
            var districts = _context.Districts.Include(a => provinces).Skip(1).Select(a => new ListsViewModel() { Name = a.Name + ", " + a.Province.Name + ", " + a.Province.City.Name}).ToList();
            list.AddRange(districts);
            var streets = _context.Streets.Include(a => provinces).Skip(1).Select(a => new ListsViewModel() { Name = a.Name + ", " + a.Province.Name + ", " + a.Province.City.Name }).ToList(); 
            list.AddRange(streets);
            return list;
        }

        // GET: api/Cities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            var city = await _context.Citys.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }

            return city;
        }

        // GET: api/Cities/name
        [HttpGet]
        [Route("GetCity/{name}")]
        public async Task<ActionResult<City>> GetCitybyname(string name)
        {
            var city = _context.Citys.FirstOrDefault(a => a.Name == name);

            if (city == null)
            {
                return NotFound();
            }

            return city;
        }

        // PUT: api/Cities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCity(int id, City city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            _context.Entry(city).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cities
        [HttpPost]
        public async Task<ActionResult<City>> PostCity(City city)
        {
            _context.Citys.Add(city);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCity", new { id = city.Id }, city);
        }

        // DELETE: api/Cities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<City>> DeleteCity(int id)
        {
            var city = await _context.Citys.FindAsync(id);
            if (city == null)
            {
                return NotFound();
            }

            _context.Citys.Remove(city);
            await _context.SaveChangesAsync();

            return city;
        }

        private bool CityExists(int id)
        {
            return _context.Citys.Any(e => e.Id == id);
        }
    }
}
