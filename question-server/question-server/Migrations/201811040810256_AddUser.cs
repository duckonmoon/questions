namespace question_server.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Answers", "CreatedBy_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.Questions", "CreatedBy_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Answers", "CreatedBy_Id");
            CreateIndex("dbo.Questions", "CreatedBy_Id");
            AddForeignKey("dbo.Answers", "CreatedBy_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.Questions", "CreatedBy_Id", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Questions", "CreatedBy_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Answers", "CreatedBy_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Questions", new[] { "CreatedBy_Id" });
            DropIndex("dbo.Answers", new[] { "CreatedBy_Id" });
            DropColumn("dbo.Questions", "CreatedBy_Id");
            DropColumn("dbo.Answers", "CreatedBy_Id");
        }
    }
}
