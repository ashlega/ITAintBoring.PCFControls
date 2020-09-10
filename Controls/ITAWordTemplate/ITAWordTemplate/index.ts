import "bootstrap";

import {IInputs, IOutputs} from "./generated/ManifestTypes";


export class ITAWordTemplate implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // Div element created as part of this control's main container
	private button: HTMLButtonElement;
	private _buttonTitle: string;
	private _flowUrl: string;
	private _fileName: string;
	private _downloadFile : any;
	private _getFile : any;
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
		// Add control initialization code

		if(context.parameters.ButtonTitle.raw != null){
			this._buttonTitle = context.parameters.ButtonTitle.raw;
		}
		else this._buttonTitle = "";
		if(context.parameters.FileName.raw != null){
			this._fileName = context.parameters.FileName.raw;
			this._fileName = this.replaceParameters(this._fileName);
		}
		else this._fileName = "";
		if(context.parameters.FlowUrl.raw != null){
			this._flowUrl = context.parameters.FlowUrl.raw;
		}
		else this._flowUrl = "";
		this.button = <HTMLButtonElement>document.createElement("button");
		this.button.classList.add("btn");
		this.button.classList.add("btn-success");
		this.button.innerText = this._buttonTitle;

		this._downloadFile = this.downloadFile.bind(this);
		this._getFile = this.getFile.bind(this);

		this.button.onclick = this._getFile;
        container.appendChild(this.button);

		this._notifyOutputChanged = notifyOutputChanged;
	}

	public replaceParameters(value: string)
	{
		return value.replace("#id#", this.getUrlParameter("id"));
	}

	public downloadFile(blob: any) {
		if (navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, this._fileName);
		} else {
			var link = document.createElement("a");
			if (link.download !== undefined) { 
				var url = URL.createObjectURL(blob);
				link.setAttribute("href", url);
				link.setAttribute("download", this._fileName);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}

	public getFile() {
		var docId: string = this.getUrlParameter("id");

		var data = {
			docId: docId
		};

		fetch(this._flowUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) 
			}).then(response => {
				response.blob().then(blob => {
					this.downloadFile(blob);
				})
			}).then(data => console.log(data));
	}


	public getUrlParameter(sParam : string) {
		var sPageURL = window.top.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;
	
		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? "" : decodeURIComponent(sParameterName[1]);
			}
		}
		return "";
	};

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