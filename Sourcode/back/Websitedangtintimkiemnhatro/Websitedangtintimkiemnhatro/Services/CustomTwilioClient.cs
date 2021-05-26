using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Twilio.Clients;
using Twilio.Http;

namespace Websitedangtintimkiemnhatro.Services
{
    public class CustomTwilioClient : ITwilioRestClient
    {
        private readonly ITwilioRestClient _innerClient;

        public CustomTwilioClient(IConfiguration config, System.Net.Http.HttpClient httpClient)
        {
            // customise the underlying HttpClient
            httpClient.DefaultRequestHeaders.Add("X-Custom-Header", "HttpClientFactory-Sample");

            _innerClient = new TwilioRestClient(
                config["ACe56747cf5aa4bfad909a56411f6a2cb2"],
                config["9b202d2c03e5890536d7010d59c0e3e7"],
                httpClient: new SystemNetHttpClient(httpClient));
        }

        public Response Request(Request request) => _innerClient.Request(request);
        public Task<Response> RequestAsync(Request request) => _innerClient.RequestAsync(request);
        public string AccountSid => _innerClient.AccountSid;
        public string Region => _innerClient.Region;
        public Twilio.Http.HttpClient HttpClient => _innerClient.HttpClient;
    }
}
