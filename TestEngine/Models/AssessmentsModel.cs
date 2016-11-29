using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace TestEngine.Models
{

    public class NameAndPath
    {
        public string Name;
        public string Path;
    }


    public class AssessmentsModel
    {
        public static IEnumerable<NameAndPath> GetList(string filePath, string webDirectory) =>
            Directory.GetFiles(filePath)
                .Where(x => x.Contains("json"))
                .Select(x => x.Split('\\').Last())
                .Select(x => new NameAndPath
                {
                    Name = x.Split('.')[0]
                    ,
                    Path = webDirectory + "/" + x
                }
                );
    }
}