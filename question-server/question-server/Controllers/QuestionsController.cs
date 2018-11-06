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
    public class QuestionsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Questions/5
        [ResponseType(typeof(FullQuestionDTO))]
        public async Task<IHttpActionResult> GetQuestion(int id)
        {
            Question question = await db.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            var questionDTO = new FullQuestionDTO()
            {
                id = question.Id,
                title = question.Title,
                description = question.Description,
                createdBy = question.CreatedBy.UserName,
                theme = new ThemeDTO()
                {
                    id = question.Theme.Id,
                    title = question.Theme.Title,
                    description = question.Theme.Description,
                    image = question.Theme.Image
                },
                answers = question.Answers.Select(dbanswer => new AnswerDTO()
                {
                    id = dbanswer.Id,
                    title = dbanswer.Title,
                    description = dbanswer.Description,
                    createdBy = dbanswer.CreatedBy.UserName

                }).ToList()
            };
            return Ok(questionDTO);
        }

        // POST: api/Questions
        [Authorize]
        [ResponseType(typeof(Question))]
        public async Task<IHttpActionResult> PostQuestion([FromBody] QuestionInputDTO question)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("ModelState is not valid.");
            }
                
            if (question.description == null || question.title == null ||
                question.description == "" || question.title == "")
            {
                return BadRequest();
            }



            var userName = RequestContext.Principal.Identity.Name;

            var user = db.Users.Where(u => u.UserName == userName)
                       .First();

            Theme theme = await db.Themes.FindAsync(question.themeId);
            if (theme == null || user == null)
            {
                return NotFound();
            }

            Question dbQuestion = new Question()
            {
                Title = question.title,
                Description = question.description,
                Theme = theme,
                CreatedBy = user
            };

            db.Questions.Add(dbQuestion);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = dbQuestion.Id }, dbQuestion);
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