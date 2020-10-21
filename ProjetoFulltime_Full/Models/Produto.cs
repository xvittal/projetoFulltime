using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjetoFulltime_Full.Models
{
    public class Produto
    {
        [Key]
        public int Id { get; set; }
        
        [StringLength(150)]
        public string Descricao_Produto { get; set; }
        
        public int Quantidade { get; set; }
        
        public double Valor { get; set; }

        public List<DetalheVenda> DetalheVenda { get; set; }

    }

}