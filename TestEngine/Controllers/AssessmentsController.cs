using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TestEngine.Controllers
{

    using Models;

    [RoutePrefix("Assessment")]
    public class AssessmentsController : ApiController
    {
        [Route("")]
        public IEnumerable<NameAndPath> GetAssessmentList() => 
                AssessmentsModel.GetList
                    (Constants.AssessmentFilePath, Constants.AssessmentWebDirectory);



        public string ToUpperCase(string upperCaseString)
        {
            return upperCaseString.ToUpper();
        }


    }
}
