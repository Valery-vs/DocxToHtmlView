namespace Editor.Contract
{
    using System.IO;
    using Model;

    public interface IDocxToHtmlConverter
    {
        HtmlDoc Convert(MemoryStream memoryStream, string fileName);
    }
}
