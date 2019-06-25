import {IInputs, IOutputs} from "./generated/ManifestTypes";

import * as $ from 'jquery';
/*
/// <reference types="@types/[jstree]" />
*/


//declare var $: any;

export class TreeRelationships implements ComponentFramework.StandardControl<IInputs, IOutputs> {



    // Cached context object for the latest updateView
    private contextObj: ComponentFramework.Context<IInputs>;
    // Div element created as part of this control's main container
    private mainContainer: HTMLDivElement;
	
	
	private _initTreeHandler : any;
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
		
		
		this.contextObj = context;
        // Need to track container resize so that control could get the available width. The available height won't be provided even this is true
        context.mode.trackContainerResize(true);
        // Create main table container div. 
        this.mainContainer = document.createElement("div");
		
		
		var controlId = "foo";
		
		this.mainContainer.innerHTML = `
		    <div id="` + controlId + `" class="jstree-open">
			  <ul>
				<li>Root node 1
				  <ul>
					<li>Child node 1</li>
					<li><a href="#">Child node 2</a></li>
				  </ul>
				</li>
			  </ul>
			</div>
		`;
		/*
		var jsTreeCSS = document.createElement('link ');
        jsTreeCSS.setAttribute("rel","stylesheet");
        jsTreeCSS.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css");
		*/
		
		//this._initTreeHandler = this.initTree.bind(this);
		
		
		
		var scriptElement  = document.createElement("script");
	    scriptElement.src  = "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js";
	    scriptElement.type = "text/javascript";
		
		container.appendChild(scriptElement);
		container.appendChild(this.mainContainer);
		
		var scriptElementOnLoad  = document.createElement("script");
	    scriptElementOnLoad.type = "text/javascript";
		scriptElementOnLoad.innerHTML = `
		    debugger; 
		    initTreeControl();
			
			function initTreeControl()
			{
				if(typeof($('#`+ controlId +`').jstree) == 'undefined')
				{
					setTimeout(initTreeControl, 500);
				}
				else
				{
					$('#`+ controlId +`').jstree();
				}
			}
			 
		`;
		
		container.appendChild(scriptElementOnLoad);

		//this.mainContainer.innerHTML += "<script>setTimeout(function(){ $(" + controlId + ").jstree(); }, 1000);</script>"
		
		
		/*
		var jsTreeScript = document.createElement('script');
        jsTreeScript.setAttribute("type","text/javascript");
        jsTreeScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js");
		
		container.appendChild(jsTreeScript);
		this.initTree('#foo');
		*/
        
		
		
	}

	public initTree(controlId: string): void {
		
		
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
}