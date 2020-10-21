using ProjetoFulltime_Full.DAL;
using ProjetoFulltime_Full.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace ProjetoFulltime_Full.Controllers
{
    public class HomeController : Controller
    {
        public ApplicationDBContext contexto = new ApplicationDBContext();
        // GET: Home
        public ActionResult Index()
        {
            AdicionarNoInicio();
            
            //List<Produto> produtos = contexto.Produto.ToList();
            //ViewBag.Produtos = produtos;

            return View();
        }
        public void AdicionarNoInicio()
        {
            List<Produto> produto = new List<Produto>
            {
                new Produto{  Descricao_Produto = "American Potato"   , Quantidade = 55 , Valor = 7.99    },
                new Produto{  Descricao_Produto = "Batata Doce"       , Quantidade = 80 , Valor = 5.89    },
                new Produto{  Descricao_Produto = "Batata Terra"      , Quantidade = 99 , Valor = 6.33    },
                new Produto{  Descricao_Produto = "Batata Recheada"   , Quantidade = 60 , Valor = 26.33   },
                new Produto{  Descricao_Produto = "Batata Palha"      , Quantidade = 88 , Valor = 12.54   },
                new Produto{  Descricao_Produto = "Pure de Batata"    , Quantidade = 70 , Valor = 26.33   },
                new Produto{  Descricao_Produto = "Semilha"           , Quantidade = 99 , Valor = 3.00    }
            };
            produto.ForEach(item => contexto.Produto.Add(item));
            contexto.SaveChanges();
        }



    }
}