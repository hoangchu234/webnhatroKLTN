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
        [Route("GetComments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.Include(e => e.User).ToListAsync();
        }

        // GET: api/Comments/GetCountLikeComment
        [HttpGet]
        [Route("GetCountLikeComment")]
        public async Task<ActionResult<Object>> GetCountLikeComment()
        {
            var like = _context.LikeCommentPosts.ToList();

            var result = like.GroupBy(id => id.IdCommnent).OrderByDescending(id => id.Count()).Select(g => new { Id = g.Key, Count = g.Count() });

            if (result == null)
            {
                return NotFound();
            }

            return result as Object;
        }

        // GET: api/Comments/GetChildComments/5
        [HttpGet]
        [Route("GetChildComments/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetChildCommentById(int id)
        {
            var comments = await _context.Comments.Include(a => a.User).Where(a => a.ParentCommentId == id).Take(2).ToListAsync() ;

            if (comments == null)
            {
                return NotFound();
            }

            return comments;
        }

        // GET: api/Comments/GetParentComments/5
        [HttpGet]
        [Route("GetParentComments/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetParentCommentByPostId(int id)
        {
            var comments = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId == null).Include(a => a.User).ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }

            return comments;
        }

        // GET: api/Comments/GetCommentFirsts/5
        [HttpGet]
        [Route("GetCommentFirsts/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentFirsts(int id)
        {
            var comments = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId == null).Include(a => a.User).Take(2).ToListAsync();

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

        // GET: api/Comments
        [HttpGet]
        [Route("GetCommentPosts/{id}/{number}/{skipNumber}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentPosts(int id, int number, int skipNumber)
        {
            var comments = await _context.Comments.Include(e => e.User).Where(a => a.PostId == id).Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, User = c.User }).Skip(skipNumber).Take(number).ToListAsync();
            return comments;
        }

        [HttpGet]
        [Route("CountCommentPost/{id}")]
        public async Task<ActionResult> CountCommentPost(int id)
        {
            var list = await _context.Comments.Where(a => a.PostId == id).Select(c => new Comment { Id = c.Id }).ToListAsync();
            return Content(list.Count.ToString());
        }

        [HttpGet]
        [Route("CountChildCommentPost/{id}")]
        public async Task<ActionResult> CountChildCommentPost(int id)
        {
            var list = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId != null).ToListAsync();
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

            var commentNew = await _context.Comments.Include(a => a.User).Where(a => a.Id == comment.Id).FirstOrDefaultAsync();
            return commentNew;
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
