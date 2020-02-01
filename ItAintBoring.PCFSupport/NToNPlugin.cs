using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using System.Text.RegularExpressions;
using System.Runtime.Serialization.Json;
using System.IO;
using Microsoft.Xrm.Sdk.Messages;

namespace ItAintBoring.PCFSupport
{
    public class NToNPlugin: IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracingService =
                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            if(context.InputParameters.Contains("Target") && context.MessageName == "Create")
            {
                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                Entity target = (Entity)context.InputParameters["Target"];
                try
                {
                    foreach (var a in target.Attributes)
                    {
                        if (a.Value is string)
                        {
                            string val = (string)a.Value;
                            if (val != null && val.StartsWith(NToNData.PREFIX))
                            {
                                var ser = new DataContractJsonSerializer(typeof(NToNData));
                                var stream1 = new MemoryStream();
                                StreamWriter sw = new StreamWriter(stream1);
                                sw.Write(val.Remove(0, NToNData.PREFIX.Length));
                                sw.Flush();
                                stream1.Position = 0;
                                NToNData data = (NToNData)ser.ReadObject(stream1);

                                AssociateRequest ar = new AssociateRequest();
                                ar.Relationship = new Relationship(data.rn);
                                ar.Target = target.ToEntityReference();
                                ar.RelatedEntities = new EntityReferenceCollection();
                                if (data.actions != null)
                                {
                                    foreach (DataAction act in data.actions)
                                    {
                                        EntityReference er = new EntityReference(data.len, Guid.Parse(act.guid));
                                        ar.RelatedEntities.Add(er);
                                    }
                                    service.Execute(ar);
                                }
                            }
                        }
                    }
                }
                catch(Exception ex)
                {
                    throw new InvalidPluginExecutionException(ex.Message);
                }
            }
        }
    }

}
