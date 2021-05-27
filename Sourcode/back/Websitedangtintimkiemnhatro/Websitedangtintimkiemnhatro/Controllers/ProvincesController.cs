using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Websitedangtintimkiemnhatro.Models;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProvincesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Provinces
        [HttpGet]
        [Route("GetProvincesApp/{id}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetProvincesApp(int id)
        {
            var provinces = await _context.Provinces.Where(a => a.Id != 0 && a.CityId == id).ToListAsync();
            var getprovinces = provinces.Select(c => new
            {
                Id = c.Id,
                Name = c.Name,
            }).ToList();
            return getprovinces;
        }

        // GET: api/Provinces
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvinces()
        {
            return await _context.Provinces.ToListAsync();
        }

        // GET: api/GetProvinceByID/5
        [HttpGet]
        [Route("GetProvinceByID/{id}")]
        public async Task<ActionResult<Province>> GetProvinceByID(int id)
        {
            var province =  _context.Provinces.FirstOrDefault(a => a.Id == id);

            if (province == null)
            {
                return NotFound();
            }

            return province;
        }

        // GET: api/Provinces/5
        [HttpGet]
        [Route("GetProvince/{id}")]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvince(int id)
        {
            var province = await _context.Provinces.Where(a => a.CityId == id).ToListAsync();

            if (province == null)
            {
                return NotFound();
            }

            return province;
        }

        // GET: api/Provinces/name
        [HttpGet]
        [Route("GetProvinceByName/{name}")]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvinceByName(string name)
        {
            var province = await _context.Provinces.Where(a => a.City.Name == name).ToListAsync();

            if (province == null)
            {
                return NotFound();
            }

            return province;
        }

        // PUT: api/Provinces/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProvince(int id, Province province)
        {
            if (id != province.Id)
            {
                return BadRequest();
            }

            _context.Entry(province).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvinceExists(id))
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

        // POST: api/Provinces
        [HttpPost]
        public async Task<ActionResult<Province>> PostProvince(Province province)
        {
            _context.Provinces.Add(province);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProvince", new { id = province.Id }, province);
        }

        // DELETE: api/Provinces/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Province>> DeleteProvince(int id)
        {
            var province = await _context.Provinces.FindAsync(id);
            if (province == null)
            {
                return NotFound();
            }

            _context.Provinces.Remove(province);
            await _context.SaveChangesAsync();

            return province;
        }

        private bool ProvinceExists(int id)
        {
            return _context.Provinces.Any(e => e.Id == id);
        }
    }
}
