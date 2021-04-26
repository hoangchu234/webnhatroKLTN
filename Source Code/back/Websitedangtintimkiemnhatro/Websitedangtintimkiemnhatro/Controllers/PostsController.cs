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
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet]
        [Route("GetPosts/{number}/{skipNumber}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts(int number, int skipNumber)
        {
            var comments = await _context.Comments.Include(a => a.User).Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, User = c.User }).Take(2).ToListAsync();
            var posts = await _context.Posts.Include(e => e.User).Select(c => new Post
            {
                Id = c.Id,
                PostUser = c.PostUser,
                CreateDate = c.CreateDate,
                User = c.User,
                Comments = _context.Comments.Include(a => a.User).Where(a => a.PostId == c.Id).Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, User = c.User }).Take(2).ToList()
            }).OrderByDescending(a => a.CreateDate).Skip(skipNumber).Take(number).ToListAsync();
            return posts;
        }

        // GET: api/Posts
        [HttpGet]
        [Route("GetSomePosts")]
        public async Task<ActionResult<IEnumerable<Post>>> GetSomePosts()
        {
            var comments = await _context.Comments.Include(a => a.User).Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser , CreateDate = c.CreateDate, User = c.User }).Take(2).ToListAsync();
            var posts = await _context.Posts.Include(e => e.User).Select(c => new Post { Id = c.Id, PostUser = c.PostUser, CreateDate = c.CreateDate, User = c.User, 
                        Comments = _context.Comments.Include(a => a.User).Where(a => a.PostId == c.Id).Select(c => new Comment { Id = c.Id, CommentUser = c.CommentUser, CreateDate = c.CreateDate, User = c.User }).Take(2).ToList()
                        }).OrderByDescending(a => a.CreateDate).Take(10).ToListAsync();
            return posts;
        }

        // GET: api/Posts/5
        [HttpGet]
        [Route("GetPost/{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Posts.Include(a => a.User).Where(a => a.Id == id).FirstOrDefaultAsync();

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // GET: api/Posts/GetCountLikePost
        [HttpGet]
        [Route("GetCountLikePost")]
        public async Task<ActionResult<Object>> GetCountLikePost()
        {
            var like =  _context.LikeCommentPosts.ToList();

            var result = like.GroupBy(id => id.IdPost).OrderByDescending(id => id.Count()).Select(g => new { Id = g.Key, Count = g.Count() });

            if (result == null)
            {
                return NotFound();
            }

            return result as Object;
        }

        // POST: api/Posts
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            post.CreateDate = DateTime.Now;
            _context.Posts.Add(post);

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateException)
            {
                if (PostExists(post.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            var postNew = await _context.Posts.Include(a => a.User).Where(a => a.Id == post.Id).FirstOrDefaultAsync();
            return postNew; //Quỳnh sửa
            //return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
    }
}
