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
    public class AnswersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // POST: api/Answers
        [Authorize]
        [ResponseType(typeof(Answer))]
        public async Task<IHttpActionResult> PostAnswer([FromBody] AnswerInputDTO answer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (answer.description == null || answer.description == "")
            {
                return BadRequest();
            }
            if (answer.title == null)
            {
                answer.title = "No Title";
            }

            var userName = RequestContext.Principal.Identity.Name;

            var user = db.Users.Where(u => u.UserName == userName)
                       .First();

            Question question = await db.Questions.FindAsync(answer.questionId);
            if (question == null || user == null)
            {
                return NotFound();
            }

            Answer dbanswer = new Answer()
            {
                Title = answer.title,
                Description = answer.description,
                Question = question,
                Theme = question.Theme,
                CreatedBy = user
            };

            db.Answers.Add(dbanswer);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = dbanswer.Id }, answer);
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