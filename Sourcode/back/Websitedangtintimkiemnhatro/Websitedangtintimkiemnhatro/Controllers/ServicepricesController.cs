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
    public class ServicepricesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServicepricesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Serviceprices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Serviceprice>>> GetServiceprices()
        {
            return await _context.Serviceprices.ToListAsync();
        }

        // GET: api/Serviceprices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Serviceprice>> GetServiceprice(int id)
        {
            var serviceprice = await _context.Serviceprices.FindAsync(id);

            if (serviceprice == null)
            {
                return NotFound();
            }

            return serviceprice;
        }

        // PUT: api/Serviceprices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceprice(int id, Serviceprice serviceprice)
        {
            if (id != serviceprice.Id)
            {
                return BadRequest();
            }

            _context.Entry(serviceprice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServicepriceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetServiceprice", new { id = serviceprice.Id }, serviceprice);
        }

        // POST: api/Serviceprices
        [HttpPost]
        public async Task<ActionResult<Serviceprice>> PostServiceprice(Serviceprice serviceprice)
        {
            _context.Serviceprices.Add(serviceprice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceprice", new { id = serviceprice.Id }, serviceprice);
        }

        // DELETE: api/Serviceprices/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Serviceprice>> DeleteServiceprice(int id)
        {
            var serviceprice = await _context.Serviceprices.FindAsync(id);
            if (serviceprice == null)
            {
                return NotFound();
            }

            _context.Serviceprices.Remove(serviceprice);
            await _context.SaveChangesAsync();

            return serviceprice;
        }

        private bool ServicepriceExists(int id)
        {
            return _context.Serviceprices.Any(e => e.Id == id);
        }
    }
}
