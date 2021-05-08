using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Models;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeCommentPostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LikeCommentPostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // PUT: api/LikeCommentPosts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLikeCommentPosts(int id, LikeCommentPost likeCommentPost)
        {
            if (id != likeCommentPost.Id)
            {
                return BadRequest();
            }

            _context.Entry(likeCommentPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LikeCommentPostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLikeCommentPost", new { id = likeCommentPost.Id }, likeCommentPost);
        }

        // GET: api/LikeCommentPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LikeCommentPost>> GetLikeCommentPost(int id)
        {
            var likeCommentPost = await _context.LikeCommentPosts.FindAsync(id);

            if (likeCommentPost == null)
            {
                return NotFound();
            }

            return likeCommentPost;
        }

        // DELETE: api/LikeCommentPosts/5
        [HttpDelete]
        [Route("DeleteLikeCommentPost/{idPost}/{idUser}")]
        public async Task<ActionResult<LikeCommentPost>> DeleteLikeCommentPost(int idPost, int idUser)
        {
            var likeCommentPost = _context.LikeCommentPosts.Where(a => a.IdPost == idPost && a.UserId == idUser).FirstOrDefault();
            if (likeCommentPost == null)
            {
                return NotFound();
            }

            _context.LikeCommentPosts.Remove(likeCommentPost);
            await _context.SaveChangesAsync();

            return likeCommentPost;
        }

        // DELETE: api/LikeCommentPosts/5
        [HttpDelete]
        [Route("DeleteLikeCommentPostver2/{idComment}/{idUser}")]
        public async Task<ActionResult<LikeCommentPost>> DeleteLikeCommentPostver2(int idComment, int idUser)
        {
            var likeCommentPost = _context.LikeCommentPosts.Where(a => a.IdCommnent == idComment && a.UserId == idUser).FirstOrDefault();
            if (likeCommentPost == null)
            {
                return NotFound();
            }

            _context.LikeCommentPosts.Remove(likeCommentPost);
            await _context.SaveChangesAsync();

            return likeCommentPost;
        }

        // GET: api/LikeCommentPosts/5
        [HttpGet]
        [Route("GetCheckLikeOneTime/{idPost}/{idUser}")]
        public async Task<ActionResult<Object>> GetCheckLikeOneTime(int idPost, int idUser)
        {
            var likeCommentPost = _context.LikeCommentPosts.Where(a => a.IdPost == idPost && a.UserId == idUser).ToList();

            if (likeCommentPost.Count == 0)
            {
                return false;
            }

            return true;
        }

        // GET: api/LikeCommentPosts/5
        [HttpGet]
        [Route("GetCheckLikeOneTimever2/{idComment}/{idUser}")]
        public async Task<ActionResult<Object>> GetCheckLikeOneTimever2(int idComment, int idUser)
        {
            var likeCommentPost = _context.LikeCommentPosts.Where(a => a.IdCommnent == idComment && a.UserId == idUser).ToList();

            if (likeCommentPost.Count == 0)
            {
                return false;
            }

            return true;
        }

        private bool LikeCommentPostExists(int id)
        {
            return _context.LikeCommentPosts.Any(e => e.Id == id);
        }

        // POST: api/LikeCommentPosts
        [HttpPost]
        public async Task<ActionResult<LikeCommentPost>> PostLikeCommentPost(LikeCommentPost like)
        {
            _context.LikeCommentPosts.Add(like);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LikeCommentPosttExists(like.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return like;
        }

        private bool LikeCommentPosttExists(int id)
        {
            return _context.LikeCommentPosts.Any(e => e.Id == id);
        }
    }
}
