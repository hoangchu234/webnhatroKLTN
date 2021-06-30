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
    public class ReportPostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportPostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ReportPosts/5
        [HttpGet]
        [Route("GetReportPosts")]
        public async Task<ActionResult<Object>> GetReportPosts()
        {
            var reportPosts = _context.ReportPosts.Include(a => a.Post).ThenInclude(a => a.User).OrderByDescending(a => a.Post.CreateDate).ToList();
            var result = reportPosts.Select(g => new { Id = g.Id, Report = g.Report, Write = g.Write, IdPost = g.PostId, PostUser = g.Post.PostUser, CreateDate = g.Post.CreateDate, HiddenOrNotHidden = g.Post.HiddenOrNotHidden, UserId = g.Post.User.Id, HovaTen = g.Post.User.HovaTen });

            if (result == null)
            {
                return NotFound();
            }

            return result as Object;
        }

        // POST: api/ReportPosts
        [HttpPost]
        public async Task<ActionResult<ReportPost>> PostReportPost(ReportPost reportPost)
        {
            _context.ReportPosts.Add(reportPost);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LikeReportPostExists(reportPost.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return reportPost;
        }

        private bool LikeReportPostExists(int id)
        {
            return _context.ReportPosts.Any(e => e.Id == id);
        }
    }
}
