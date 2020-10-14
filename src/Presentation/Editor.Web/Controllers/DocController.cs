namespace Editor.Web.Controllers
{
    using System.IO;
    using Contract;
    using Microsoft.AspNetCore.Mvc;
    using Model;

    [ApiController]
    [Route("[controller]")]
    public class DocController : ControllerBase
    {
        private readonly IDocxToHtmlConverter converter;

        public DocController(IDocxToHtmlConverter converter)
        {
            this.converter = converter;
        }

        [HttpPut("docxtohtml")]
        [RequestSizeLimit(115343360)]
        public HtmlDoc ConvertDocxToHtml()
        {
            var file = this.Request.Form.Files[0];

            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);

            return this.converter.Convert(memoryStream, file.FileName);
        }
    }
}
