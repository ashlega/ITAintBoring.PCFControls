using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ItAintBoring.PCFSupport
{
    [DataContract]
    class DataAction
    {
        [DataMember]
        public string guid;

        [DataMember]
        public bool associate;
    }

    [DataContract]
    internal class NToNData
    {
        public const string PREFIX = "NTONDATA:";
        [DataMember]
        public string len = null;
        [DataMember]
        public string ida = null;
        [DataMember]
        public string na = null;
        [DataMember]
        public string re = null;
        [DataMember]
        public string rn = null;
        [DataMember]
        public DataAction[] actions = null;
        /*
        if(context.parameters.linkedEntityName.raw != null)
		  this._linkedEntityName = context.parameters.linkedEntityName.raw;
		if(context.parameters.idAttribute.raw != null)
		  this._idAttribute = context.parameters.idAttribute.raw;
		if(context.parameters.nameAttribute.raw != null)
	      this._nameAttribute = context.parameters.nameAttribute.raw;
	    if(context.parameters.relationshipEntity.raw != null)
	      this._relationshipEntity = context.parameters.relationshipEntity.raw;
        if(context.parameters.relationshipName.raw != null)
	      this._relationshipName = context.parameters.relationshipName.raw;
          */

    }
}
