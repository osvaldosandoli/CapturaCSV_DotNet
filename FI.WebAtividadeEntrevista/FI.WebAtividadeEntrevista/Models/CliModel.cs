using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FI.WebAtividadeEntrevista.Models
{
    public class CliModel
    {
        public int Id { get; set; }
        public string nome { get; set; }

        public float salario { get; set; }

        public string nomeCsv { get; set; }

        public string cep { get; set; }
    }
}