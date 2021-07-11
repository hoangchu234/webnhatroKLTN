using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Websitedangtintimkiemnhatro.Models;
using BC = BCrypt.Net.BCrypt;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync(); 
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // GET: api/Accounts/CheckPhoneNumber
        [HttpGet]
        [Route("CheckPhoneNumber/{phone}")]
        public async Task<ActionResult<Object>> CheckPhoneNumber(string phone)
        {
            var account = await _context.Accounts.Where(a => String.Compare(a.Phone, phone) == 0).FirstOrDefaultAsync();
            if (account == null)
            {
                return Content("Số điện thoại chưa được dùng");
            }
            return Content("Số điện thoại đã được dùng");

        }

        // GET: api/Accounts/CheckPhoneNumber
        [HttpGet]
        [Route("CheckPhoneNumberForget/{phone}")]
        public async Task<ActionResult<Object>> CheckPhoneNumberForget(string phone)
        {
            var account = await _context.Accounts.Where(a => String.Compare(a.Phone, phone) == 0).FirstOrDefaultAsync();
            if (account == null)
            {
                return Content("Số điện thoại không tồn tại");
            }
            return Content("Số điện thoại tồn tại");

        }

        // GET: api/Accounts/CheckPasswordEdit
        [HttpPost]
        [Route("CheckPasswordEdit/{id}")]
        public async Task<ActionResult<Object>> CheckPasswordEdit(int id, Account account)
        {
            var accountFind = await _context.Accounts.Where(a => a.Id == id).FirstOrDefaultAsync();
            bool verified = BC.Verify(account.Password, accountFind.Password);

            if (!verified)
            {
                return Content("Không tồn tại password này");
            }
            return Content("Tồn tại");

        }

        // PUT: api/Accounts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            var accountFind = await _context.Accounts.Where(a => a.Id == id).FirstOrDefaultAsync();
            bool verified = BC.Verify(account.Password, accountFind.Password);

            if (!verified)
            {
                // hash password
                String passwordHash = BC.HashPassword(account.Password);
                account.Password = passwordHash;
            }


            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // PUT: api/Accounts/PutAccountPhone
        [HttpPut]
        [Route("PutAccountPhone/{id}")]
        public async Task<IActionResult> PutAccountPhone(int id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

      
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // GET: api/Accounts/GetAccountPhone
        [HttpGet]
        [Route("GetAccountPhone/{phone}")]
        public async Task<ActionResult<Account>> GetAccountPhone(string phone)
        {
            var account = _context.Accounts.Where(a => a.Phone == phone).FirstOrDefault();

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/ForgetPassword
        [HttpPut]
        [Route("ForgetPassword/{id}")]
        public async Task<IActionResult> ForgetPassword(int id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            // hash password
            String passwordHash = BC.HashPassword(account.Password);
            account.Password = passwordHash;
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(account.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // POST: api/Accounts/Normal
        // string password
        [HttpPost]
        [Route("Normal")]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            account.IsActive = true;
            account.RoleId = 1;
            account.IsHD = true;

            // hash password
            String passwordHash = BC.HashPassword(account.Password);
            account.Password = passwordHash;

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            int id = account.Id;
            account.User.CreatedDate = DateTime.Now;
            account.User.LastLogOnDate = DateTime.Now;
            account.User.Gender = true;
            account.User.PubishFree = 3;
            _context.Users.Add(account.User);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // POST: api/Accounts/SocialAccount
        // string password
        [HttpPost]
        [Route("Socialaccount")]
        public async Task<ActionResult<Account>> SocialAccount(Account account)
        {
            account.IsActive = true;
            account.RoleId = 1;
            account.IsHD = true;

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            int id = account.Id;
            account.User.CreatedDate = DateTime.Now;
            account.User.LastLogOnDate = DateTime.Now;
            account.User.Gender = true;
            account.User.PubishFree = 3;
            _context.Users.Add(account.User);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return account;
        }

        // POST: api/Accounts/Signin
        //phone,password
        [HttpPost]
        [Route("Signin")]
        public async Task<ActionResult<Account>> SignIn(Account account)
        {
            var accountdb = await _context.Accounts.Where(a => a.Phone == account.Phone).FirstOrDefaultAsync();

            bool verified = BC.Verify(account.Password, accountdb.Password);
            if (!verified)
            {
                return Content("false");
            }
            else
            {
                string phone = account.Phone;
                var accountfind = _context.Accounts.Include(m => m.User).Include(m => m.Employee).Where(b => b.Phone == phone).FirstOrDefault();
                return accountfind;
            }
        }

        // POST: api/Accounts/Signinsocial
        [HttpPost]
        [Route("Signinsocial")]
        public async Task<ActionResult<Account>> SignInsocial(User user)
        {
            var accountdb = await _context.Accounts.Include(m => m.User).Include(m => m.Employee).Include(a => a.Role).Where(m => m.User.Email == user.Email).ToListAsync();

            if (accountdb != null)
            {
                var accountfind = _context.Accounts.Include(m => m.User).Include(m => m.Employee).Include(a => a.Role).Where(m => m.User.Email == user.Email).FirstOrDefault();
                return accountfind;
            }
            return Content("false");
        }

        // PUT: api/Accounts/Lockaccount
        [HttpPut]
        [Route("Lock/{id}")]
        public async Task<IActionResult> Lockaccount(int id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }

        //public static string getLastNameCommaFirstName(String fullName)
        //{
        //    List<string> names = fullName.Split(' ').ToList();
        //    string firstName = names.First();
        //    names.RemoveAt(0);
        //    return String.Join(" ", names.ToArray()) + "," + firstName;
        //}
    }
}
