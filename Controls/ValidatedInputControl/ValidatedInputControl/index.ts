import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ValidatedInputControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  // Value of the field is stored and used inside the control 
  private _value: string;
  // RegEx to test against
  private _regEx: RegExp | null = null;
  // PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
  private _notifyOutputChanged: () => void;
  // label element created as part of this control
  private labelElement: HTMLLabelElement;
  // input element that is used to create the range slider
  private inputElement: HTMLInputElement;
  // Reference to the control container HTMLDivElement
  // This element contains all elements of our custom control example
  private _container: HTMLDivElement;
  // Reference to ComponentFramework Context object
  private _context: ComponentFramework.Context<IInputs>;
  // Event Handler 'refreshData' reference
  private _refreshData: EventListenerOrEventListenerObject;

  constructor() {
  }

  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
	  debugger;
    this._context = context;
    this._container = document.createElement("div");
    this._notifyOutputChanged = notifyOutputChanged;
    this._refreshData = this.refreshData.bind(this);
    // creating HTML elements for the input type range and binding it to the function which refreshes the control data
    this.inputElement = document.createElement("input");
    this.inputElement.setAttribute("type", "text");
    this.inputElement.addEventListener("input", this._refreshData);
    this._value = context.parameters.value.raw;
	
	if(context.parameters.regEx != null)
	   this._regEx = new RegExp(context.parameters.regEx.raw);
   
    this.inputElement.setAttribute("value", context.parameters.value.formatted ? context.parameters.value.formatted : "0");
	this.labelElement = document.createElement("label");
    this.labelElement.innerHTML = "Test";//context.parameters.sliderValue.formatted ? context.parameters.sliderValue.formatted : "0";
    // appending the HTML elements to the control's HTML container element.
    this._container.appendChild(this.inputElement);
    this._container.appendChild(this.labelElement);
    container.appendChild(this._container);
  }

  /**
  * Updates the values to the internal value variable we are storing and also updates the html label that displays the value
  * @param context : The "Input Properties" containing the parameters, control metadata and interface functions
  */

  public refreshData(evt: Event): void {
    
	var tempValue = (this.inputElement.value as any) as string;
	
	if (this._regEx == null || this._regEx.test(tempValue)) {
		this._value = tempValue;
		this._notifyOutputChanged();
		this.labelElement.innerHTML = "";
	}
    else {
		this.labelElement.innerHTML = "Incorrect format!";
	}
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // storing the latest context from the control.
    this._value = context.parameters.value.raw;
    this._context = context;
    this.inputElement.setAttribute("value",context.parameters.value.formatted ? context.parameters.value.formatted : "");
  }

  public getOutputs(): IOutputs {
    return {
      value: this._value
    };
  }

  public destroy() {
    this.inputElement.removeEventListener("input", this._refreshData);
  }
}