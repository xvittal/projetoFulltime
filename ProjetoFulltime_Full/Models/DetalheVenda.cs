using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoFulltime_Full.Models
{
    public class DetalheVenda
    {
        [Key]
        public int Id { get; set; }
        
        public List<Produto> Produto { get; set; }
    }

}