using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LyeCalculator.Startup))]
namespace LyeCalculator
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
