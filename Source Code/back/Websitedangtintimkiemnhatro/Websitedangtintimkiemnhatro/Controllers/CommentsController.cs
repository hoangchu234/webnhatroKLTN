using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Models;
using Websitedangtintimkiemnhatro.ViewModels;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        [ActionName("GetComments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.Include(e => e.User).ToListAsync();
        }

        // GET: api/Comments/GetChildComments/5
        [HttpGet]
        [ActionName("GetChildComments/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetChildCommentById(int id)
        {
            var comments = await _context.Comments.Include(a => a.User.HovaTen).Where(a => a.ParentCommentId == id).ToListAsync() ;

            if (comments == null)
            {
                return NotFound();
            }

            return comments;
        }

        // GET: api/Comments/GetParentComments/5
        [HttpGet]
        [ActionName("GetParentComments/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetParentCommentByPostId(int id)
        {
            var comments = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId == null).ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }

            return comments;
        }

        [HttpGet]
        [Route("CountComment/{id}/{idParent}")]
        public async Task<ActionResult> CountComment(int id, int idParent)
        {
            var list = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId == idParent).ToListAsync();
            return Content(list.Count.ToString());
        }


        // POST: api/Comments
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            comment.CreateDate = DateTime.Now;
            _context.Comments.Add(comment);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CommentExists(comment.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToAction("GetComments", "Comments");
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
