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
    public class StreetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StreetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Streets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Street>>> GetStreets()
        {
            return await _context.Streets.ToListAsync();
        }

        // GET: api/Streets/GetDistrictByID/5
        [HttpGet]
        [Route("GetStreetByID/{id}")]
        public async Task<ActionResult<Street>> GetStreetByID(int id)
        {
            var street = await _context.Streets.FindAsync(id);

            if (street == null)
            {
                return NotFound();
            }

            return street;
        }

        // GET: api/Streets/GetStreetByProvince/5
        [HttpGet]
        [Route("GetStreetByProvince/{id}")]
        public async Task<ActionResult<IEnumerable<Street>>> GetStreetByProvince(int id)
        {
            var streets = await _context.Streets.Where(a => a.ProvinceId == id).ToListAsync();

            if (streets == null)
            {
                return NotFound();
            }

            return streets;
        }

        // PUT: api/Streets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStreet(int id, Street street)
        {
            if (id != street.Id)
            {
                return BadRequest();
            }

            _context.Entry(street).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StreetExists(id))
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

        // POST: api/Streets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Street>> PostStreet(Street street)
        {
            _context.Streets.Add(street);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStreet", new { id = street.Id }, street);
        }

        // DELETE: api/Streets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Street>> DeleteStreet(int id)
        {
            var street = await _context.Streets.FindAsync(id);
            if (street == null)
            {
                return NotFound();
            }

            _context.Streets.Remove(street);
            await _context.SaveChangesAsync();

            return street;
        }

        private bool StreetExists(int id)
        {
            return _context.Streets.Any(e => e.Id == id);
        }
    }
}
