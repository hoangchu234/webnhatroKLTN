using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Models;

namespace Websitedangtintimkiemnhatro.Hubs
{
    public class SignalrHub : Hub
    {
        private int Users;

        public async Task BroadcastNumberOfUsers(int nbUser)
        {
            await Clients.All.SendAsync("OnUserConnected", nbUser);
        }

        public override async Task OnConnectedAsync()
        {
            Users++;
            await BroadcastNumberOfUsers(Users);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Users--;
            await BroadcastNumberOfUsers(Users);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
