//  Copyright (C) Microsoft Corporation.  All rights reserved.

using Microsoft.Xrm.Sdk;
using System;
using System.ServiceModel;

namespace $safeprojectname$
{
  /// <summary>
  /// PluginEntryPoint plug-in.
  /// This is a generic entry point for a plug-in class. Use the Plug-in Registration tool to register this class, import the assembly into CDS, and then create step associations.
  /// A given plug-in can have any number of steps associated with it. 
  /// </summary>    
  public class Plugin1 : PluginBase
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="PluginEntryPoint"/> class.
    /// </summary>
    /// <param name="unsecure">Contains public (unsecured) configuration information.</param>
    /// <param name="secure">Contains non-public (secured) configuration information. </param>
    public Plugin1(string unsecure, string secure)
        : base(typeof(Plugin1))
    {

      // TODO: Implement your custom configuration handling.
    }


    /// <summary>
    /// Main entry point for he business logic that the plug-in is to execute.
    /// </summary>
    /// <param name="localContext">The <see cref="LocalPluginContext"/> which contains the
    /// <see cref="IPluginExecutionContext"/>,
    /// <see cref="IOrganizationService"/>
    /// and <see cref="ITracingService"/>
    /// </param>
    /// <remarks>
    /// For improved performance, PowerApps CDS caches plug-in instances.
    /// The plug-in's Execute method should be written to be stateless as the constructor
    /// is not called for every invocation of the plug-in. Also, multiple system threads
    /// could execute the plug-in at the same time. All per invocation state information
    /// is stored in the context. This means that you should not use global variables in plug-ins.
    /// </remarks>
    protected override void ExecuteCdsPlugin(LocalPluginContext localContext)
    {
      if (localContext == null)
      {
        throw new ArgumentNullException("localContext");
      }
    
      IPluginExecutionContext context = localContext.PluginExecutionContext;

     // TODO: Implement your custom Plug-in business logic.

     // Check for the entity on which the plugin would be registered
     //   if (context.InputParameters.Contains("Target")
     //      && context.InputParameters["Target"] is Entity)
     //   {
     //     Entity entity = (Entity)localContext.PluginExecutionContext.InputParameters["Target"];

     //     // Check for entity name on which this plugin would be registered
     //     if (entity.LogicalName == "account")
     //     {
     //     }
     //   }
    }
  }
}