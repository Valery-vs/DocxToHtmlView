namespace Editor.Services
{
    using System;
    using System.Drawing.Imaging;
    using System.IO;
    using System.Linq;
    using System.Xml.Linq;
    using Contract;
    using DocumentFormat.OpenXml.Packaging;
    using Model;
    using OpenXmlPowerTools;

    public class DocxToHtmlConverter : IDocxToHtmlConverter
    {
        public HtmlDoc Convert(MemoryStream memoryStream, string fileName)
        {
            using var wDoc = WordprocessingDocument.Open(memoryStream, true);

            var destFileName = new FileInfo(fileName.Replace(".docx", ".html"));
            var outputDirectory = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());

            var imageDirectoryName =
                destFileName.Name.Substring(0, destFileName.Name.Length - 5) + "_files";
            imageDirectoryName = Path.Combine(outputDirectory, imageDirectoryName);
            Directory.CreateDirectory(imageDirectoryName);

            var pageTitle = fileName;
            var part = wDoc.CoreFilePropertiesPart;
            if (part != null)
            {
                pageTitle = (string) part.GetXDocument().Descendants(DC.title).FirstOrDefault() ?? fileName;
            }

            var settings = GetConverterSettings(pageTitle, imageDirectoryName);
            var htmlElement = WmlToHtmlConverter.ConvertToHtml(wDoc, settings);

            // Produce HTML document with <!DOCTYPE html > declaration to tell the browser
            // we are using HTML5.
            var html = new XDocument(
                new XDocumentType("html", null, null, null),
                htmlElement);

            // Note: the xhtml returned by ConvertToHtmlTransform contains objects of type
            // XEntity.  PtOpenXmlUtil.cs define the XEntity class.  See
            // http://blogs.msdn.com/ericwhite/archive/2010/01/21/writing-entity-references-using-linq-to-xml.aspx
            // for detailed explanation.
            //
            // If you further transform the XML tree returned by ConvertToHtmlTransform, you
            // must do it correctly, or entities will not be serialized properly.
            var htmlString = html.ToString(SaveOptions.DisableFormatting);

            return new HtmlDoc {Content = htmlString};
        }

        private static WmlToHtmlConverterSettings GetConverterSettings(string pageTitle, string imageDirectoryName)
        {
            int imageCounter = 0;
            // TODO: Determine max-width from size of content area.
            var settings = new WmlToHtmlConverterSettings()
            {
                AdditionalCss = "body { margin: 1cm auto; max-width: 20cm; padding: 0; }",
                PageTitle = pageTitle,
                FabricateCssClasses = false,
                CssClassPrefix = "pt-",
                RestrictToSupportedLanguages = false,
                RestrictToSupportedNumberingFormats = false,
                ImageHandler = imageInfo =>
                {
                    var localDirInfo = new DirectoryInfo(imageDirectoryName);
                    if (!localDirInfo.Exists)
                    {
                        localDirInfo.Create();
                    }

                    ++imageCounter;
                    var extension = imageInfo.ContentType.Split('/')[1].ToLower();
                    ImageFormat imageFormat = null;
                    switch (extension)
                    {
                        case "png":
                            imageFormat = ImageFormat.Png;
                            break;
                        case "gif":
                            imageFormat = ImageFormat.Gif;
                            break;
                        case "bmp":
                            imageFormat = ImageFormat.Bmp;
                            break;
                        case "jpeg":
                            imageFormat = ImageFormat.Jpeg;
                            break;
                        case "tiff":
                            // Convert tiff to gif.
                            extension = "gif";
                            imageFormat = ImageFormat.Gif;
                            break;
                        case "x-wmf":
                            extension = "wmf";
                            imageFormat = ImageFormat.Wmf;
                            break;
                    }

                    // If the image format isn't one that we expect, ignore it,
                    // and don't return markup for the link.
                    if (imageFormat == null)
                    {
                        return null;
                    }

                    var imageFileName = imageDirectoryName + "/image" +
                                           imageCounter.ToString() + "." + extension;
                    try
                    {
                        imageInfo.Bitmap.Save(imageFileName, imageFormat);
                    }
                    catch (System.Runtime.InteropServices.ExternalException)
                    {
                        return null;
                    }

                    var imageSource = localDirInfo.Name + "/image" +
                                         imageCounter.ToString() + "." + extension;

                    var img = new XElement(Xhtml.img,
                        new XAttribute(NoNamespace.src, imageSource),
                        imageInfo.ImgStyleAttribute,
                        imageInfo.AltText != null ? new XAttribute(NoNamespace.alt, imageInfo.AltText) : null);

                    return img;
                }
            };

            return settings;
        }
    }
}
