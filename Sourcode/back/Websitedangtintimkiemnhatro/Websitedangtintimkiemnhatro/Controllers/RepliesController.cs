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
    public class RepliesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RepliesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Replies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reply>>> GetReplys()
        {
            return await _context.Replys.ToListAsync();
        }

        // GET: api/Replies
        [HttpGet]
        [Route("GetRepliesByUserId/{id}")]
        public async Task<ActionResult<IEnumerable<Reply>>> GetRepliesByUserId(int id)
        {
            return await _context.Replys.Where(a => a.UserId == id).ToListAsync();
        }

        // GET: api/Replies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reply>> GetReply(int id)
        {
            var reply = await _context.Replys.FindAsync(id);

            if (reply == null)
            {
                return NotFound();
            }

            return reply;
        }

        // PUT: api/Replies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReply(int id, Reply reply)
        {
            if (id != reply.Id)
            {
                return BadRequest();
            }

            _context.Entry(reply).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReplyExists(id))
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

        // POST: api/Replies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Reply>> PostReply(Reply reply)
        {
            _context.Replys.Add(reply);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReply", new { id = reply.Id }, reply);
        }

        // DELETE: api/Replies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Reply>> DeleteReply(int id)
        {
            var reply = await _context.Replys.FindAsync(id);
            if (reply == null)
            {
                return NotFound();
            }

            _context.Replys.Remove(reply);
            await _context.SaveChangesAsync();

            return reply;
        }

        private bool ReplyExists(int id)
        {
            return _context.Replys.Any(e => e.Id == id);
        }
    }
}
