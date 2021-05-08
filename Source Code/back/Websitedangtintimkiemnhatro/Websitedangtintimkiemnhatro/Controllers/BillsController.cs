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
    public class BillsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BillsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBills()
        {
            return await _context.Bills.Include(a => a.Motel).ThenInclude(a => a.User).ThenInclude(a => a.Account).ToListAsync();
        }

        // GET: api/Bills
        [HttpGet]
        [Route("GetTotalMoney")]
        public async Task<ActionResult<Object>> GetTotalMoney()
        {
            var bills = _context.Bills.ToList();
            float totalMoney = 0;
            for (int i = 0; i < bills.Count; i++)
            {
                totalMoney = totalMoney + bills[i].PayMoney;
            }

            return totalMoney as Object;
        }

        [HttpGet]
        [Route("Nows")]
        public async Task<ActionResult<IEnumerable<Bill>>> GetNows()
        {
            return await _context.Bills.Include(a => a.Motel).ThenInclude(a => a.User).ThenInclude(a => a.Account).OrderByDescending(e => e.Motel.DateUpdate).Take(10).ToListAsync();
        }

        // GET: api/Bills
        [HttpGet]
        [Route("BillUser/{id}")]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBillUsers(int id)
        {
            return await _context.Bills.Where(a => a.Motel.UserId == id).ToListAsync();
        }

        // GET: api/Bills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {
            var bill = await _context.Bills.FindAsync(id);

            if (bill == null)
            {
                return NotFound();
            }

            return bill;
        }

        // PUT: api/Bills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBill(int id, Bill bill)
        {
            if (id != bill.Id)
            {
                return BadRequest();
            }

            _context.Entry(bill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BillExists(id))
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

        // POST: api/Bills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Bill>> PostBill(Bill bill)
        {
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBill", new { id = bill.Id }, bill);
        }

        // DELETE: api/Bills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Bill>> DeleteBill(int id)
        {
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null)
            {
                return NotFound();
            }

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();

            return bill;
        }

        // GET: api/Bills/GetBill/name
        [HttpGet]
        [Route("GetBill/{name}")]
        public async Task<ActionResult<BillViewModel>> GetBillSearch(string name)
        {
            string[] search = name.Split(" ");
            BillViewModel bills = new BillViewModel();
            for (int i = 0; i < search.Length; i++)
            {
                bills.Bills = _context.Bills.Include(a => a.Motel).ThenInclude(a => a.User).ThenInclude(a => a.Account).Where(a => a.Motel.User.HovaTen.ToLower().Contains(search[i].ToLower())).ToList();
            }

            if (bills == null)
            {
                return NotFound();
            }

            return bills;
        }

        private bool BillExists(int id)
        {
            return _context.Bills.Any(e => e.Id == id);
        }
    }
}
