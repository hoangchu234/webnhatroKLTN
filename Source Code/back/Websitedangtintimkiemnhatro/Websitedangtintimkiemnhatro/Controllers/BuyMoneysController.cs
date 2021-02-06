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
    public class BuyMoneysController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BuyMoneysController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BuyMoneys
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BuyMoney>>> GetBuyMoneys()
        {
            return await _context.BuyMoneys.ToListAsync();
        }

        // GET: api/BuyMoneys/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BuyMoney>> GetBuyMoney(int id)
        {
            var buyMoney = await _context.BuyMoneys.FindAsync(id);

            if (buyMoney == null)
            {
                return NotFound();
            }

            return buyMoney;
        }

        // PUT: api/BuyMoneys/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuyMoney(int id, BuyMoney buyMoney)
        {
            if (id != buyMoney.Id)
            {
                return BadRequest();
            }

            _context.Entry(buyMoney).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuyMoneyExists(id))
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

        // POST: api/BuyMoneys
        [HttpPost]
        public async Task<ActionResult<BuyMoney>> PostBuyMoney(BuyMoney buyMoney)
        {
            _context.BuyMoneys.Add(buyMoney);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBuyMoney", new { id = buyMoney.Id }, buyMoney);
        }

        // DELETE: api/BuyMoneys/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BuyMoney>> DeleteBuyMoney(int id)
        {
            var buyMoney = await _context.BuyMoneys.FindAsync(id);
            if (buyMoney == null)
            {
                return NotFound();
            }

            _context.BuyMoneys.Remove(buyMoney);
            await _context.SaveChangesAsync();

            return buyMoney;
        }

        private bool BuyMoneyExists(int id)
        {
            return _context.BuyMoneys.Any(e => e.Id == id);
        }
    }
}
