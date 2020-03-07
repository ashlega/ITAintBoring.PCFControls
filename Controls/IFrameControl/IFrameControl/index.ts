import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class IFrameControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private contextObj: ComponentFramework.Context<IInputs>;
    // Div element created as part of this control's main container
	private mainFrame: HTMLIFrameElement;
	private _frameSrc: string;
	private _currentValue: string | null;
	private _height: string | null;
	private container: HTMLDivElement;

	private _notifyOutputChanged: () => void;


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
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.container = container;
		this.contextObj = context;
		
		debugger;
		
		if(context.parameters.src.raw != null){
		  this._frameSrc = context.parameters.src.raw;
		}
		
		if(context.parameters.height.raw != null){
		  this._height = context.parameters.height.raw;
		}
		
		this._currentValue = context.parameters.value.formatted ? context.parameters.value.formatted : null;
		
		context.mode.trackContainerResize(true);
        //container.classList.add("pcf_container_element");
		
		
		
		this.mainFrame = <HTMLIFrameElement>document.createElement("iframe");
		this.mainFrame.classList.add("ita_pcf_iframe");
		this.mainFrame.src = this._frameSrc;
        container.appendChild(this.mainFrame);

		this._notifyOutputChanged = notifyOutputChanged;
		
		
	}

	
	
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this.contextObj = context;
		if(context.parameters.src.raw != null){
		  this._frameSrc = context.parameters.src.raw;
		  this.mainFrame.src = this._frameSrc;
		}
		if(context.parameters.height.raw != null){
		  this._height = context.parameters.height.raw;
		  this.mainFrame.height = this._height;
		}
		
		this._currentValue = context.parameters.value.formatted ? context.parameters.value.formatted : null;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			value: this._currentValue
		  };
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