using MySql.Data.Entity;
using ProjetoFulltime_Full.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ProjetoFulltime_Full.DAL
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext() : base ("Conexao")
        {
        }

        public DbSet<Produto> Produto { get; set; }
        public DbSet<Venda> Venda { get; set; }
        public DbSet<DetalheVenda> DetalheVenda { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
 
    } 
}