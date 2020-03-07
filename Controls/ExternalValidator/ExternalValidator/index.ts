import {IInputs, IOutputs} from "./generated/ManifestTypes";

declare var Xrm: any;

export class ExternalValidatorControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  // Value of the field is stored and used inside the control 
  private _value: string | null;
  private _attributeName: string | null = null;
  private _errorMessage: string  | null = null;
  // RegEx to test against
  private _regEx: RegExp | null = null;
  private _isError : boolean = false;
  // PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
  private _notifyOutputChanged: () => void;
  // Reference to the control container HTMLDivElement
  // This element contains all elements of our custom control example
  private _container: HTMLDivElement;
  // Reference to ComponentFramework Context object
  private _context: ComponentFramework.Context<IInputs>;
  
  constructor() {
  }
  
  public hideControl(elem : HTMLElement | null)
  {
	  if(elem == null) return;
	  if(elem.classList.contains("br"))
	  {
		  elem.style.display = 'none';
	  }
	  else this.hideControl(elem.parentElement);
  }
  
  public setErrorState(value: string)
  {
	if (this._regEx == null || this._regEx.test(value)) {
		if(this._isError == true)
		{
		  Xrm.Page.getControl(this._attributeName).clearNotification();
		}
		this._isError = false;
	}
    else {
		if(this._isError != true)
		{
		  Xrm.Page.getControl(this._attributeName).setNotification(this._errorMessage);
		}
		this._isError = true;
	}
  }

 
  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
	  debugger;
    this._context = context;
	this._attributeName = (<any>context).reporting._controlId.split('.')[0];
    this._notifyOutputChanged = notifyOutputChanged;
    this._value = context.parameters.value.raw;
	if(context.parameters.errorMessage.raw != null)
	   this._errorMessage = context.parameters.errorMessage.raw;
	if(context.parameters.regEx.raw != null)
	   this._regEx = new RegExp(context.parameters.regEx.raw);
   
    var currentValue = context.parameters.value.formatted ? context.parameters.value.formatted : "0";
    this.hideControl(container);
	this.setErrorState(currentValue);
    // appending the HTML elements to the control's HTML container element.
    
  }

  /**
  * Updates the values to the internal value variable we are storing and also updates the html label that displays the value
  * @param context : The "Input Properties" containing the parameters, control metadata and interface functions
  */

  
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // storing the latest context from the control.
	if(this._value != context.parameters.value.raw)
	{
		this._value = context.parameters.value.raw;
		this._context = context;
		var currentValue = context.parameters.value.formatted ? context.parameters.value.formatted : "0";
		this.setErrorState(currentValue);
	}
  }

  public getOutputs(): IOutputs {
    return {
      value: this._value ? this._value : undefined
    };
  }

  public destroy() {
    
  }
}