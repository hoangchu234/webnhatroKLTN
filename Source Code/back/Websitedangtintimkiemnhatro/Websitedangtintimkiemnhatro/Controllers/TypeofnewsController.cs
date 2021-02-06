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
    public class TypeofnewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TypeofnewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Typeofnews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Typeofnew>>> GetTypeofnews()
        {
            return await _context.Typeofnews.ToListAsync();
        }

        // GET: api/Typeofnews/GetNewTypeExcept
        [HttpGet]
        [Route("GetNewTypeExcept")]
        public async Task<ActionResult<IEnumerable<Typeofnew>>> GetNewTypeExcept()
        {
            var newType = await _context.Typeofnews.Where(a => a.Id != 1).ToListAsync();
            return newType;
        }

        // GET: api/Typeofnews/CountTypeofMotel
        [HttpGet]
        [Route("CountTypeofMotel")]
        public async Task<ActionResult<IEnumerable<TypeofcountViewModel>>> GetCountTypeofMotel()
        {
            List<TypeofcountViewModel> typeofcountViewModels = new List<TypeofcountViewModel>();
            var type = await _context.Typeofnews.ToListAsync();
            var motels = await _context.Motels.Include(a => a.Detail).Where(a => a.Status == "Tin đang hiển thị").ToListAsync();
            for (int i=0; i< type.Count; i++)
            {
                int count = 0;
                TypeofcountViewModel typeofcountViewModel = new TypeofcountViewModel();
                for (int j = 0; j < motels.Count; j++)
                {
                    if(motels[j].Detail.TypeofnewId == type[i].Id)
                    {
                        count++;
                    }
                }
                typeofcountViewModel.Typeofnews = type[i].Name;
                typeofcountViewModel.count = count;
                typeofcountViewModels.Add(typeofcountViewModel);
            }

            return typeofcountViewModels;
        }

        // GET: api/Typeofnews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Typeofnew>> GetTypeofnew(int id)
        {
            var typeofnew = await _context.Typeofnews.FindAsync(id);

            if (typeofnew == null)
            {
                return NotFound();
            }

            return typeofnew;
        }

        // PUT: api/Typeofnews/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeofnew(int id, Typeofnew typeofnew)
        {
            if (id != typeofnew.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeofnew).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeofnewExists(id))
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

        // POST: api/Typeofnews
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Typeofnew>> PostTypeofnew(Typeofnew typeofnew)
        {
            _context.Typeofnews.Add(typeofnew);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeofnew", new { id = typeofnew.Id }, typeofnew);
        }

        // DELETE: api/Typeofnews/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Typeofnew>> DeleteTypeofnew(int id)
        {
            var typeofnew = await _context.Typeofnews.FindAsync(id);
            if (typeofnew == null)
            {
                return NotFound();
            }

            _context.Typeofnews.Remove(typeofnew);
            await _context.SaveChangesAsync();

            return typeofnew;
        }

        private bool TypeofnewExists(int id)
        {
            return _context.Typeofnews.Any(e => e.Id == id);
        }
    }
}
