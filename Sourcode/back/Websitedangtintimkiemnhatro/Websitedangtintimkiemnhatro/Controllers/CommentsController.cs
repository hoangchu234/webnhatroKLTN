using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Hubs;
using Websitedangtintimkiemnhatro.Models;
using Websitedangtintimkiemnhatro.ViewModels;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public CommentsController(ApplicationDbContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;

        }

        // GET: api/Comments
        [HttpGet]
        [Route("GetComments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.Include(e => e.User).ToListAsync();
        }

        //// GET: api/Comments
        //[HttpGet]
        //[Route("GetCountLikeComment")]
        //public async Task<ActionResult<Object>> GetCountLikeComment()
        //{
        //    var like = _context.LikeCommentPosts.ToList();

        //    var result = like.Where(a => a.LikeComment == true).GroupBy(id => id.IdCommnent).OrderByDescending(id => id.Count()).Select(g => new { Id = g.Key, Count = g.Count() });

        //    if (result == null)
        //    {
        //        return NotFound();
        //    }

        //    return result as Object;
        //}

        // GET: api/Comments
        [HttpGet]
        [Route("GetCountLikeComment/{id}")]
        public async Task<ActionResult> GetCountLikeComment(int id)
        {
            var likeComments = _context.LikeCommentPosts.Where(a => a.IdCommnent == id).ToList();

            if (likeComments == null)
            {
                return NotFound();
            }

            return Content(likeComments.Count().ToString());
        }

        // GET: api/Comments
        [HttpGet]
        [Route("GetCountParentComment")]
        public async Task<ActionResult<Object>> GetCountParentComment()
        {
            var comments = _context.Comments.ToList();

            var result = comments.Where(a => a.ParentCommentId == null).GroupBy(id => id.PostId).OrderByDescending(id => id.Key).Select(g => new { Id = g.Key, Count = g.Count() });

            if (result == null)
            {
                return NotFound();
            }

            return result as Object;
        }

        // GET: api/Comments
        [HttpGet]
        [Route("TotalComment")]
        public async Task<ActionResult> TotalComment()
        {
            var comment = _context.Comments.ToList();

            if (comment == null)
            {
                return NotFound();
            }

            return Content(comment.Count.ToString());
        }

        // GET: api/Comments/GetChildComments/5
        [HttpGet]
        [Route("GetChildComments/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetChildCommentById(int id)
        {
            List<Comment> listcomments = new List<Comment>();
            var comments = await _context.Comments.Include(a => a.User).Where(a => a.ParentCommentId == id)
                .Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, User = c.User ,PostId = c.PostId , ParentCommentId = c.ParentCommentId, ChildComments = listcomments })
                .Take(2)
                .ToListAsync() ;

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
            List<Comment> listcomments = new List<Comment>();
            var comments = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId == null).Include(a => a.User)
                 .Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, User = c.User, PostId = c.PostId, ParentCommentId = c.ParentCommentId, ChildComments = listcomments })
                 .Take(5).ToListAsync();

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
            List<Comment> listcomments = new List<Comment>();
            var comments = await _context.Comments.Include(e => e.User).Where(a => a.PostId == id && a.ParentCommentId == null).Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, PostId = c.PostId, User = c.User, ParentCommentId = c.ParentCommentId, ChildComments = listcomments }).Skip(skipNumber).Take(number).ToListAsync();
            return comments;
        }

        // GET: api/Comments
        [HttpGet]
        [Route("GetCommentComments/{id}/{idParentComment}/{number}/{skipNumber}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentComments(int id, int idParentComment, int number, int skipNumber)
        {
            List<Comment> listcomments = new List<Comment>();
            var comments = await _context.Comments.Include(e => e.User).Where(a => a.PostId == id && a.ParentCommentId != null && a.ParentCommentId == idParentComment).Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, PostId = c.PostId, User = c.User, ParentCommentId = c.ParentCommentId, ChildComments = listcomments }).Skip(skipNumber).Take(number).ToListAsync();
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
        [Route("CountCommentParent/{id}")]
        public async Task<ActionResult> CountCommentParent(int id)
        {
            var list = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId == null).Select(c => new Comment { Id = c.Id }).ToListAsync();
            return Content(list.Count.ToString());
        }

        [HttpGet]
        [Route("CountChildCommentPost/{id}/{idParentComment}")]
        public async Task<ActionResult> CountChildCommentPost(int id, int idParentComment)
        {
            var list = await _context.Comments.Where(a => a.PostId == id && a.ParentCommentId != null && a.ParentCommentId == idParentComment).ToListAsync();
            return Content(list.Count.ToString());
        }

        [HttpGet]
        [Route("GetCommentNotifyByOneUser/{id}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetCommentNotifyByOneUser(int id)
        {
            DateTime aDateTime = DateTime.Now;
            var list = await _context.InformComments.Include(a => a.Comment).ThenInclude(a => a.User).Where(a => a.IdUserReceiced == id)
                .Select(a => new { Id = a.Id, IdPost = a.Comment.PostId, PostUser = a.Comment.Post.PostUser, IdUserReceiced = a.IdUserReceiced, JustSee = a.JustSee, IdComment = a.CommentId, UserComment = a.Comment.CommentUser, Username = a.Comment.User.HovaTen, ImageUser = a.Comment.User.UserImage, Day = aDateTime.Subtract(a.Comment.CreateDate).Days }).ToListAsync();
            return list;
        }

        [HttpGet]
        [Route("CountCommentNotifyByOneUser/{id}")]
        public async Task<ActionResult> CountCommentNotifyByOneUser(int id)
        {
            DateTime aDateTime = DateTime.Now;  
            var list = await _context.InformComments.Where(a => a.IdUserReceiced == id && a.JustSee == false).ToListAsync();
            return Content(list.Count().ToString());
        }

        // PUT: api/Comments/5
        [HttpPut]
        [Route("PutCommentNotifyByOneUser/{id}")]
        public async Task<ActionResult<InformComment>> PutCommentNotifyByOneUser(int id, InformComment inform)
        {
            if (id != inform.Id)
            {
                return BadRequest();
            }
            _context.Entry(inform).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.BroadcastMessage();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InformCommentsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var informNew = _context.InformComments.Where(a => a.Id == id).FirstOrDefault();
            return informNew;
        }

        private bool InformCommentsExists(int id)
        {
            return _context.InformComments.Any(e => e.Id == id);
        }

        // POST: api/Comments
        [HttpPost]
        [Route("PostComment/{id}")]
        public async Task<ActionResult<Comment>> PostComment(int id, Comment comment)
        {
            comment.CreateDate = DateTime.Now;

            _context.Comments.Add(comment);

            try
            {
                await _context.SaveChangesAsync();
                var infromComment = new InformComment();
                infromComment.JustSee = false;
                infromComment.IdUserReceiced = id;
                infromComment.CommentId = comment.Id;
                _context.InformComments.Add(infromComment);
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.BroadcastMessage();
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
            List<Comment> listcomments = new List<Comment>();
            var commentNew = await _context.Comments.Include(a => a.User).Where(a => a.Id == comment.Id)
                 .Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, User = c.User, PostId = c.PostId, ParentCommentId = c.ParentCommentId, ChildComments = listcomments })
                 .FirstOrDefaultAsync();
            //var commentNew = await _context.Comments.Include(a => a.User).Where(a => a.Id == comment.Id).FirstOrDefaultAsync();
            return commentNew;
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
