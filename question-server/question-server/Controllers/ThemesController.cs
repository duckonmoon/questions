using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using question_server.Models;

namespace question_server.Controllers
{
    public class ThemesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Themes
        public IQueryable<ThemeDTO> GetThemes()
        {
            return db.Themes.Select((theme) => new ThemeDTO()
            {
                id = theme.Id,
                title = theme.Title,
                description = theme.Description,
                image = theme.Image
            }
            );
        }

        // GET: api/Themes/5
        [ResponseType(typeof(List<QuestionOutputDTO>))]
        public IHttpActionResult GetTheme(int id)
        {
            Theme theme = db.Themes.Find(id);
            if (theme == null)
            {
                return NotFound();
            }

            var dbQuestions = db.Questions.Where((question) => question.Theme.Id == id).ToList();



            var questions = dbQuestions.Select((question) => new QuestionOutputDTO()
            {
                id = question.Id,
                title = question.Title,
                description = question.Description,
                themeId = question.Theme.Id,
                createdBy = question.CreatedBy.UserName
            }).ToList();



            return Ok(new ThemeContainer()
            {
                theme = new ThemeDTO()
                {
                    id = theme.Id,
                    title = theme.Title,
                    description = theme.Description,
                    image = theme.Image
                },
                questions = questions
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}