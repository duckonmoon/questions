namespace question_server.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<question_server.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(question_server.Models.ApplicationDbContext context)
        {
            context.Themes.AddOrUpdate(x => x.Id,
        new Models.Theme()
        {
            Id = 1,
            Title = "Cookies",
            Description = "All about cookies, recipes for cookies, tutorial how to eat, cook cookies, even how to save cookie in browser. ",
            Image = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-242371.jpg"
        },
        new Models.Theme()
        {
            Id = 2,
            Title = "Candy Kindom",
            Description = "We need to save candy kingdom. Everything about princess Bubblegum",
            Image = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-116490.jpg"
        });
        }

    }
}
