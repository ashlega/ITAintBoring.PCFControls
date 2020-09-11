import {IInputs, IOutputs} from "./generated/ManifestTypes";

declare var Xrm: any;
export class ITAFileDownloadButton implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// Div element created as part of this control's main container
	private button: HTMLButtonElement;
	private _buttonTitle: string;
	private _downloadUrlP1: string;
	private _downloadUrlP2: string;
	private _downloadUrlP3: string;
	private _downloadUrl: string;
	private _httpMethodName: string;
	private _fileNameTemplate: string;
	private _openInNewTab: string;
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

		if(context.parameters.OpenInNewTab.raw != null){
			this._openInNewTab = context.parameters.OpenInNewTab.raw.toUpperCase();
		}
		else this._openInNewTab = "FALSE";

		if(context.parameters.ButtonTitle.raw != null){
			this._buttonTitle = context.parameters.ButtonTitle.raw;
		}
		else this._buttonTitle = "";

		if(context.parameters.FileNameTemplate.raw != null){
			this._fileNameTemplate = context.parameters.FileNameTemplate.raw;
			
		}
		else this._fileNameTemplate = "";

		if(context.parameters.DownloadUrlP1.raw != null){
			this._downloadUrlP1 = context.parameters.DownloadUrlP1.raw;
		}
		else this._downloadUrlP1 = "";

		if(context.parameters.DownloadUrlP2.raw != null){
			this._downloadUrlP2 = context.parameters.DownloadUrlP2.raw;
		}
		else this._downloadUrlP2 = "";

		if(context.parameters.DownloadUrlP3.raw != null){
			this._downloadUrlP3 = context.parameters.DownloadUrlP3.raw;
		}
		else this._downloadUrlP3 = "";

		this._downloadUrl = this._downloadUrlP1 + this._downloadUrlP2 + this._downloadUrlP3;

		if(context.parameters.HttpMethodName.raw != null){
			this._httpMethodName = context.parameters.HttpMethodName.raw;
		}
		else this._httpMethodName = "GET";

		this.button = <HTMLButtonElement>document.createElement("button");
		this.button.classList.add("btn");
		this.button.classList.add("btn-success");
		this.button.innerText = this.replaceParameters(this._buttonTitle);

		this._getFile = this.getFile.bind(this);

		this.button.onclick = this._getFile;
        container.appendChild(this.button);

		this._notifyOutputChanged = notifyOutputChanged;
	}

	public getAttributeValue(paramName: string)
	{
		var result = "";
		if(Xrm != null){
			var attrib = Xrm.Page.getAttribute(paramName);
			if(attrib != null) result = attrib.getValue();//won't work for lookups and, maybe, some other attribute types 
		}
		return result;
	}

	//supported parameter name
	//id - current record id
	//entity attribute names ("ita_name" for example)
	public replaceSingleParameter(value: string, paramName: string)
	{
		var re = new RegExp(paramName, "g");
		var result = value;
		if(paramName == "id"){
			
			result =  result.replace(re, this.getUrlParameter("id"));
		}
		else {
			result =  result.replace(re, this.getAttributeValue(paramName.replace('#', '').replace('#','')));//remove surrounding # characters
		}
		return result;
	}


	public replaceParameters(value: string)
	{
		var result = value;
		var paramArray = value.match(/#[^#].+?#/gi);
		if(paramArray != null) paramArray.forEach(parameter => result = this.replaceSingleParameter(result, parameter) );
		return result;
	}

	public downloadFile(blob: any) {
		var _fileName = this.replaceParameters(this._fileNameTemplate);

		if(this._openInNewTab === "FALSE"){
			if (navigator.msSaveBlob) { // IE 10+
				navigator.msSaveBlob(blob, _fileName);
			} else {
				var link = document.createElement("a");
				if (link.download !== undefined) { 
					var url = URL.createObjectURL(blob);
					link.setAttribute("href", url);
					link.setAttribute("download", _fileName);
					link.style.visibility = 'hidden';
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}
			}
		}
		else{
			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(blob, _fileName); //IE is the worst!!!
		    }
		    else {
				var fileURL = URL.createObjectURL(blob);
				var link: HTMLAnchorElement = document.createElement('a');
				link.href = fileURL;
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
		    }
		}
	}

	public getFile() {
		var recordId: string = this.getUrlParameter("id");

		var data = {
			recordId: recordId
		};

		var url = this.replaceParameters(this._downloadUrl);
		fetch(url, {
			method: this._httpMethodName,
			headers: {
				'Content-Type': 'application/json'
			},
			body: (this._httpMethodName == "POST" ? JSON.stringify(data) : null) 
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
