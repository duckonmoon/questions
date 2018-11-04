namespace question_server.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DbCreation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Answers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Description = c.String(),
                        Question_Id = c.Int(),
                        Theme_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Questions", t => t.Question_Id)
                .ForeignKey("dbo.Themes", t => t.Theme_Id)
                .Index(t => t.Question_Id)
                .Index(t => t.Theme_Id);
            
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Description = c.String(),
                        Theme_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Themes", t => t.Theme_Id)
                .Index(t => t.Theme_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Answers", "Theme_Id", "dbo.Themes");
            DropForeignKey("dbo.Questions", "Theme_Id", "dbo.Themes");
            DropForeignKey("dbo.Answers", "Question_Id", "dbo.Questions");
            DropIndex("dbo.Questions", new[] { "Theme_Id" });
            DropIndex("dbo.Answers", new[] { "Theme_Id" });
            DropIndex("dbo.Answers", new[] { "Question_Id" });
            DropTable("dbo.Questions");
            DropTable("dbo.Answers");
        }
    }
}
