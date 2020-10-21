using ProjetoFulltime_Full.DAL;
using System.Data.Entity;
using System.Web.Mvc;
using System.Web.Routing;

namespace ProjetoFulltime_Full
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected ApplicationDBContext contexto = new ApplicationDBContext();
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            Database.SetInitializer(new DropCreateDatabaseAlways<ApplicationDBContext>()); 
        }
        
    }
}
