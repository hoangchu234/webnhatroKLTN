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
    public class PriceSearchesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PriceSearchesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PriceSearches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PriceSearch>>> GetPriceSearchs()
        {
            return await _context.PriceSearchs.ToListAsync();
        }

        // GET: api/PriceSearches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PriceSearch>> GetPriceSearch(int id)
        {
            var priceSearch = await _context.PriceSearchs.FindAsync(id);

            if (priceSearch == null)
            {
                return NotFound();
            }

            return priceSearch;
        }

        // PUT: api/PriceSearches/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPriceSearch(int id, PriceSearch priceSearch)
        {
            if (id != priceSearch.Id)
            {
                return BadRequest();
            }

            _context.Entry(priceSearch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceSearchExists(id))
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

        // POST: api/PriceSearches
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<PriceSearch>> PostPriceSearch(PriceSearch priceSearch)
        {
            _context.PriceSearchs.Add(priceSearch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPriceSearch", new { id = priceSearch.Id }, priceSearch);
        }

        // DELETE: api/PriceSearches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PriceSearch>> DeletePriceSearch(int id)
        {
            var priceSearch = await _context.PriceSearchs.FindAsync(id);
            if (priceSearch == null)
            {
                return NotFound();
            }

            _context.PriceSearchs.Remove(priceSearch);
            await _context.SaveChangesAsync();

            return priceSearch;
        }

        private bool PriceSearchExists(int id)
        {
            return _context.PriceSearchs.Any(e => e.Id == id);
        }
    }
}
