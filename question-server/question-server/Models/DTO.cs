using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace question_server.Models
{
    public class ThemeDTO
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string image { get; set; }
    }

    public class QuestionInputDTO
    {
        public string title { get; set; }
        public string description { get; set; }
        public int themeId { get; set; }
    }

    public class QuestionOutputDTO
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int themeId { get; set; }
        public string createdBy { get; set; }
    }

    public class ThemeContainer
    {
        public ThemeDTO theme { get; set; }
        public List<QuestionOutputDTO> questions { get; set; }
    }
}