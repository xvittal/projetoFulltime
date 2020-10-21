using System;
using System.ComponentModel.DataAnnotations;

namespace ProjetoFulltime_Full.Models
{
    public class Venda
    {
        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Nome_Cliente { get; set; }
        
        public DateTime Data_Venda { get; set; }

        public int Quantidade { get; set; }
       
        public DetalheVenda Detalhe_Venda { get; set; }

    }
}