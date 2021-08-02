using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Hubs
{
    public interface IHubClient
    {
        Task BroadcastMessage();
    }
}
