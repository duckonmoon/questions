using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace question_server.Models
{
    public abstract class BaseModel
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class Theme : BaseModel
    {
        public string Image { get; set; }
    }

    public class Question : BaseModel
    {
        public virtual Theme Theme { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
        public virtual ApplicationUser CreatedBy { get; set; }
    }

    public class Answer : BaseModel
    {
        public virtual Theme Theme { get; set; }
        public virtual Question Question { get; set; }
        public virtual ApplicationUser CreatedBy { get; set; }
    }
}