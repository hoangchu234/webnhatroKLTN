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
    public class AreaSearchesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AreaSearchesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AreaSearches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AreaSearch>>> GetAreaSearchs()
        {
            return await _context.AreaSearchs.ToListAsync();
        }

        // GET: api/AreaSearches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AreaSearch>> GetAreaSearch(int id)
        {
            var areaSearch = await _context.AreaSearchs.FindAsync(id);

            if (areaSearch == null)
            {
                return NotFound();
            }

            return areaSearch;
        }

        // PUT: api/AreaSearches/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAreaSearch(int id, AreaSearch areaSearch)
        {
            if (id != areaSearch.Id)
            {
                return BadRequest();
            }

            _context.Entry(areaSearch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AreaSearchExists(id))
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

        // POST: api/AreaSearches
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AreaSearch>> PostAreaSearch(AreaSearch areaSearch)
        {
            _context.AreaSearchs.Add(areaSearch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAreaSearch", new { id = areaSearch.Id }, areaSearch);
        }

        // DELETE: api/AreaSearches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AreaSearch>> DeleteAreaSearch(int id)
        {
            var areaSearch = await _context.AreaSearchs.FindAsync(id);
            if (areaSearch == null)
            {
                return NotFound();
            }

            _context.AreaSearchs.Remove(areaSearch);
            await _context.SaveChangesAsync();

            return areaSearch;
        }

        private bool AreaSearchExists(int id)
        {
            return _context.AreaSearchs.Any(e => e.Id == id);
        }
    }
}
