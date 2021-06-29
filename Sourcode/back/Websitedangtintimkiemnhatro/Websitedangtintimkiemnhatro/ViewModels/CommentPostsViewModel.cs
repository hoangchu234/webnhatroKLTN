using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Models;

namespace Websitedangtintimkiemnhatro.ViewModels
{
    public class CommentPostsViewModel
    {
        public List<Post> Posts { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
