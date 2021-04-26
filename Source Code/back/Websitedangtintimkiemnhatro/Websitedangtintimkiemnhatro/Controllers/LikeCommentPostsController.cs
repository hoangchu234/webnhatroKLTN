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
