import {IInputs, IOutputs} from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

import * as $ from 'jquery';
/*
/// <reference types="@types/[jstree]" />
*/


class jsTreeNodeState{
	opened    : boolean;  
    disabled  : boolean;  
	selected  : boolean;  
}
class jsTreeNode {
	  id: string | null;
	  text: string;
	  children: jsTreeNode[];
	  state: jsTreeNodeState;
}

//declare var $: any;

declare var Xrm: any;

export class TreeRelationships implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private root: jsTreeNode;
	private selectedItems: string[] = [];

    // Cached context object for the latest updateView
    private contextObj: ComponentFramework.Context<IInputs>;
    // Div element created as part of this control's main container
    private mainContainer: HTMLDivElement;
	
	
	private _initTreeHandler : any;
	private _successCallback : any;
	private _relationshipSuccessCallback: any;
	private _onNodeCheckClick: any;
	private _treeMetadataSuccessCallback: any;
	private _entityMetadataSuccessCallback: any;
	
	private _relationshipName: string;
    private _treeEntityCollectionName: string;
    private _mainEntityCollectionName: string;
	
	private _relationshipEntity: string;
	private _treeEntityName: string;
	private _treeEntityAttribute: string;
	private _idAttribute: string;
	private _nameAttribute: string;
	private  controlId: string;
	private  container: HTMLDivElement;
		
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		
		this.container = container;
		this.contextObj = context;
        // Need to track container resize so that control could get the available width. The available height won't be provided even this is true
        context.mode.trackContainerResize(true);
        // Create main table container div. 
        this.mainContainer = document.createElement("div");
		
		
		this.controlId = "foo";
		
		this.mainContainer.innerHTML = `
		    <div id="` + this.controlId + `" class="jstree-open">
			  <ul>
				
			  </ul>
			</div>
		`;
		/*
		
		<li>Root node 1
				  <ul>
					<li>Child node 1</li>
					<li><a href="#">Child node 2</a></li>
				  </ul>
				</li>
		
		var jsTreeCSS = document.createElement('link ');
        jsTreeCSS.setAttribute("rel","stylesheet");
        jsTreeCSS.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css");
		*/
		
		this._initTreeHandler = this.initTree.bind(this);
		
		
		
		var scriptElement  = document.createElement("script");
	    scriptElement.src  = "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js";
	    scriptElement.type = "text/javascript";
		
		container.appendChild(scriptElement);
		container.appendChild(this.mainContainer);
		
		

		//this.mainContainer.innerHTML += "<script>setTimeout(function(){ $(" + controlId + ").jstree(); }, 1000);</script>"
		
		
		/*
		var jsTreeScript = document.createElement('script');
        jsTreeScript.setAttribute("type","text/javascript");
        jsTreeScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js");
		
		container.appendChild(jsTreeScript);
		this.initTree('#foo');
		*/
		
		
        var scriptElementOnLoad  = document.createElement("script");
	    scriptElementOnLoad.type = "text/javascript";
		scriptElementOnLoad.innerHTML = `
		     
			
		    initTreeControl();
			
			function initTreeControl()
			{
				if(typeof($('#`+ this.controlId +`').jstree) == 'undefined')
				{
					setTimeout(initTreeControl, 500);
				}
				else
				{
					window.top.`+this.controlId+`= $('#`+ this.controlId +`');
					
				}
			}
			 
		`;
		/*//$('#`+ this.controlId +`').jstree();*/
		this.container.appendChild(scriptElementOnLoad);
		
		if(context.parameters.treeEntityName != null)
	      this._treeEntityName = context.parameters.treeEntityName.raw;
	    if(context.parameters.treeEntityAttribute != null)
	      this._treeEntityAttribute = '_'+context.parameters.treeEntityAttribute.raw+'_value';
	    if(context.parameters.idAttribute != null)
	      this._idAttribute = context.parameters.idAttribute.raw;
	    if(context.parameters.nameAttribute != null)
	      this._nameAttribute = context.parameters.nameAttribute.raw;
	    if(context.parameters.relationshipEntity != null)
	      this._relationshipEntity = context.parameters.relationshipEntity.raw;
        if(context.parameters.relationshipName != null)
	      this._relationshipName = context.parameters.relationshipName.raw;
   
   
        this._relationshipSuccessCallback = this.relationshipSuccessCallback.bind(this);
		this._successCallback = this.successCallback.bind(this);
		
		this.root = new jsTreeNode();
		this.root.id = null;
		this.root.children = [];
		
		
		this._onNodeCheckClick = this.nodeClick.bind(this);
		
		this._entityMetadataSuccessCallback = this.entityMetadataSuccessCallback.bind(this);
		this._treeMetadataSuccessCallback = this.treeMetadataSuccessCallback.bind(this);
		
		(<any>Xrm).Utility.getEntityMetadata((<any>this.contextObj).page.entityTypeName,[]).then(this._entityMetadataSuccessCallback, this.errorCallback);
		(<any>Xrm).Utility.getEntityMetadata(this._treeEntityName,[]).then(this._treeMetadataSuccessCallback, this.errorCallback);
		
		this.contextObj.webAPI.retrieveMultipleRecords(this._relationshipEntity, "?$filter="+ (<any>this.contextObj).page.entityTypeName+"id eq " + (<any>this.contextObj).page.entityId, 5000).then(this._relationshipSuccessCallback, this.errorCallback);
		
	
	}
	
	public entityMetadataSuccessCallback(value: any) : void | PromiseLike<void>
	{
		this._mainEntityCollectionName = value.EntitySetName;
	}
	
	public treeMetadataSuccessCallback(value: any) : void | PromiseLike<void>
	{
		this._treeEntityCollectionName = value.EntitySetName;
	}
	
    public addChildElements(value: any, root: jsTreeNode | null)
	{
		for(var i in value.entities)
		{
			var current : any = value.entities[i];
			if(current != null && root != null){
			    if(current[this._treeEntityAttribute] == root.id)
			    {
					
				   var newNode : jsTreeNode = new jsTreeNode();
				   newNode.id = current[this._idAttribute];
				   newNode.text = current[this._nameAttribute];
				   newNode.children = [];
				   
				   var checked = this.selectedItems.indexOf(<string>newNode.id) > -1;
				   newNode.state = new jsTreeNodeState();
				   
				   newNode.state.disabled = false;
				   newNode.state.opened = false;
				   newNode.state.selected = checked;
				 
				   root.children.push(newNode);
				   this.addChildElements(value, newNode);
			    }
			}
		}
	}
	
	
	
	public successCallback(value: any) : void | PromiseLike<void>
	{
		
  		this.addChildElements(value, this.root);
		this.initTree();
		
		
	}	

    public relationshipSuccessCallback(value: any) : void | PromiseLike<void>
	{
		for(var i in value.entities)
		{
			this.selectedItems.push(value.entities[i][this._idAttribute]);
		}
  		this.contextObj.webAPI.retrieveMultipleRecords(this._treeEntityName, "", 5000).then(this._successCallback, this.errorCallback);
	}		
	
	public errorCallback(value: any)
	{
		alert(value);
	}		

	public initTree(): void {
		
		if((<any>window).top[this.controlId].jstree == null)
		{
			setTimeout(this._initTreeHandler, 500);
		}
		else{
			(<any>window).top[this.controlId].jstree({
				"plugins": ["checkbox"],
				"core":{
					"data" : this.root.children
				}
			});
			var _self = this;
			(<any>window).top[this.controlId].bind("changed.jstree",
			    function(e: any, data: any){
					
					setTimeout(function(){ _self._onNodeCheckClick(data); }, 50);
				}
			);
		}
		
		/*
		
		debugger;
		var _self = this;
		var current = window;
		while(current != null && current != current.parent)
		{
			var control = (<any>current).$(controlId);
			if(control.jstree != null){
			  control.jstree();
			  return;
			}
			current = current.parent;
		}
		setTimeout(function(){ _self._initTreeHandler(controlId); }, 500);
		*/
		
    }

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
	
	public nodeClick(data: any)
	{
		/*
		function (e: any, data: any) {
					ProcessClick(
					alert("Checked: " + data.node.id);
					alert("Parent: " + data.node.parent); 
					//alert(JSON.stringify(data));
				}
		*/
		var url: string = (<any>Xrm).Utility.getGlobalContext().getClientUrl();
		var recordUrl: string = url + "/api/data/v9.1/"+ this._mainEntityCollectionName + "(" + (<any>this.contextObj).page.entityId + ")";
		
		if(data.action == "select_node")
		{
			//See himbap samples here: http://himbap.com/blog/?p=2063
			var associate = {
				"@odata.id": recordUrl
			};
			
			var req = new XMLHttpRequest();
			req.open("POST", url + "/api/data/v9.1/"+ this._treeEntityCollectionName +"(" + data.node.id + ")/" + this._relationshipName + "/$ref", true);
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.onreadystatechange = function() {
				if (this.readyState == 4 /* complete */ ) {
					req.onreadystatechange = null;
					if (this.status == 204) {
						//alert('Record Associated');
					} else {
						var error = JSON.parse(this.response).error;
						alert(error.message);
					}
				}
			};
			req.send(JSON.stringify(associate));
	
		}
		else if(data.action == "deselect_node")
		{
			var req = new XMLHttpRequest();
			req.open("DELETE",url + "/api/data/v9.1/"+ this._treeEntityCollectionName +"(" + data.node.id + ")/" + this._relationshipName + "/$ref"+"?$id="+recordUrl, true);
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.onreadystatechange = function() {
				if (this.readyState == 4 /* complete */ ) {
					req.onreadystatechange = null;
					if (this.status == 204) {
						//alert('Record Disassociated');
					} else {
						var error = JSON.parse(this.response).error;
						alert(error.message);
					}
				}
			};
			req.send();
		}
		
	}		
}