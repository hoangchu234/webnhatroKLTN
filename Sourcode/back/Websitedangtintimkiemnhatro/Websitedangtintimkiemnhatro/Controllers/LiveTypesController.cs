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
    public class LiveTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LiveTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LiveTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiveType>>> GetLiveTypes()
        {
            return await _context.LiveTypes.ToListAsync();
        }

        // GET: api/LiveTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LiveType>> GetLiveType(int id)
        {
            var liveType = await _context.LiveTypes.FindAsync(id);

            if (liveType == null)
            {
                return NotFound();
            }

            return liveType;
        }

        // PUT: api/LiveTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiveType(int id, LiveType liveType)
        {
            if (id != liveType.Id)
            {
                return BadRequest();
            }

            _context.Entry(liveType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiveTypeExists(id))
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

        // POST: api/LiveTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LiveType>> PostLiveType(LiveType liveType)
        {
            _context.LiveTypes.Add(liveType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiveType", new { id = liveType.Id }, liveType);
        }

        // DELETE: api/LiveTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LiveType>> DeleteLiveType(int id)
        {
            var liveType = await _context.LiveTypes.FindAsync(id);
            if (liveType == null)
            {
                return NotFound();
            }

            _context.LiveTypes.Remove(liveType);
            await _context.SaveChangesAsync();

            return liveType;
        }

        private bool LiveTypeExists(int id)
        {
            return _context.LiveTypes.Any(e => e.Id == id);
        }
    }
}
