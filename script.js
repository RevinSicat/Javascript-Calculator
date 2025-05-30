//HTML Element Variables
const divRoot = document.getElementById("root");

//HTML React Element Variables
const reactDivRoot = ReactDOM.createRoot(divRoot);

//Variables


//Classes
class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            equation: [],
            input: "0"
        }
    }
    handleInputChange(type, value) {
        if (type === "number") {
            this.setState((prevState) => {
                const inputValueIsOperator = ["+", "-", "*", "/"].includes(prevState.input);

                if (prevState.input === "0" && value === "0") {
                    return null;
                }
                if (prevState.input.includes(".") && value === "."){
                    return null;
                }
                if (prevState.input === "0" && value === ".") {
                    const updatedValue = prevState.input + value;
                    const updatedEquation = [...prevState.equation];

                    const isLastValueSameInput = updatedEquation[updatedEquation.length - 1] === prevState.input;
                    if (isLastValueSameInput) {
                        updatedEquation[updatedEquation.length - 1] = updatedValue;
                    } else {
                        updatedEquation.push(updatedValue);
                    }

                    return {
                        equation: updatedEquation,
                        input: updatedValue
                    };
                }

                if (inputValueIsOperator || prevState.input === "0") {
                    const updatedEquation = [...prevState.equation, value];
                    console.log("Equation:", updatedEquation);
                    
                    return {
                        equation: updatedEquation,
                        input: value
                    };
                } 
                else {
                    const updatedEquation = [...prevState.equation];
                    const isLastValueSameInput = updatedEquation[updatedEquation.length - 1] === prevState.input;

                    if(isLastValueSameInput){
                        updatedEquation[updatedEquation.length -1] = prevState.input + value;
                    }
                    else {
                        updatedEquation.push(prevState.input + value);
                    }

                    console.log("Equation:", updatedEquation);

                    return {
                        equation: updatedEquation,
                        input: prevState.input + value
                    };
                }
            });
        }
        else if (type === "operator") {
            this.setState((prevState) => {
                const lastValue = prevState.equation[prevState.equation.length - 1];
                const secondLastValue = prevState.equation[prevState.equation.length - 2];
                const isLastValueIsOperator = ["+", "-", "*", "/"].includes(lastValue);
                const isSecondLastValueIsOperator = ["+", "-", "*", "/"].includes(secondLastValue);

                if (value === "-" && isLastValueIsOperator && !isSecondLastValueIsOperator) {
                    const updatedEquation = [...prevState.equation, value];
                    console.log("Equation:", updatedEquation);
                    return {
                        equation: updatedEquation,
                        input: value
                    };
                }

                if (isLastValueIsOperator && isSecondLastValueIsOperator) {
                    const updatedEquation = [...prevState.equation];
                    updatedEquation.splice(updatedEquation.length - 2, 2, value);
                    console.log("Equation:", updatedEquation);
                    return {
                        equation: updatedEquation,
                        input: value
                    };
                }

                if (isLastValueIsOperator) {
                    const updatedEquation = [...prevState.equation];
                    updatedEquation[updatedEquation.length - 1] = value;
                    console.log("Equation:", updatedEquation);
                    return {
                        equation: updatedEquation,
                        input: value
                    };
                }

                const updatedEquation = [...prevState.equation, value];
                console.log("Equation:", updatedEquation);
                return {
                    equation: updatedEquation,
                    input: value
                };
            });
        }
        else if (type === "equals") {
            console.log("Equals Pressed");
            this.setState((prevState) => {
                let tempEquation = [...prevState.equation];

                for (let i = 0; i < tempEquation.length; i++) {
                    const value = tempEquation[i];
                    if (value === "*") {
                        const result = this.handleMutliplyEquation(tempEquation[i - 1], tempEquation[i + 1]).toString();
                        tempEquation.splice(i - 1, 3, result);
                        i = -1; 
                    }
                }

                for (let i = 0; i < tempEquation.length; i++) {
                    const value = tempEquation[i];
                    if (value === "/") {
                        const result = this.handleDivideEquation(tempEquation[i - 1], tempEquation[i + 1]).toString();
                        tempEquation.splice(i - 1, 3, result);
                        i = -1;
                    }
                }

                for (let i = 0; i < tempEquation.length; i++) {
                    const value = tempEquation[i];
                    if (value === "+") {
                        const result = this.handleAddEquation(tempEquation[i - 1], tempEquation[i + 1]).toString();
                        tempEquation.splice(i - 1, 3, result);
                        i = -1;
                    }
                }

                for (let i = 0; i < tempEquation.length; i++) {
                    const value = tempEquation[i];
                    if (value === "-") {
                        const result = this.handleSubtractEquation(tempEquation[i - 1], tempEquation[i + 1]).toString();
                        tempEquation.splice(i - 1, 3, result);
                        i = -1;
                    }
                }

                return {
                    equation: [...prevState.equation, "=", tempEquation[0]],
                    input: tempEquation[0]
                };
            });
        }

    }
    handleAddEquation(val1, val2){
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);
        return num1 + num2;
    }
    handleSubtractEquation(val1, val2){
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);
        return num1 - num2;
    }
    handleDivideEquation(val1, val2){
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);
        return num1 / num2;
    }
    handleMutliplyEquation(val1, val2){
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);
        return num1 * num2;
    }
    clearInput() {
        this.setState({
            equation: [],
            input: "0"
        })
    }
    renderOutput() {
        return (
            <div id="display-div">
                <h3 id="equation">{this.state.equation}</h3>
                <h3 id="display">{this.state.input}</h3>
            </div>
        )
    }
    renderButtons() {
        const buttons = [{
            id: "clear",
            text: "AC",
            class: "clear",
            action: ()=> this.clearInput()
        },{
            id: "multiply",
            text: "x",
            class: "operator",
            action: ()=> this.handleInputChange("operator", "*")
        },{
            id: "divide",
            text: "/",
            class: "operator",
            action: ()=> this.handleInputChange("operator", "/")
        },{
            id: "seven",
            class: "number",
            text: "7",
            action: ()=> this.handleInputChange("number", "7")
        },{
            id: "eight",
            text: "8",
            class: "number",
            action: ()=> this.handleInputChange("number", "8")
        },{
            id: "nine",
            text: "9",
            class: "number",
            action: ()=> this.handleInputChange("number", "9")
        },{
            id: "add",
            text: "+",
            class: "operator",
            action: ()=> this.handleInputChange("operator", "+")
        },{
            id: "four",
            text: "4",
            class: "number",
            action: ()=> this.handleInputChange("number", "4")
        },{
            id: "five",
            text: "5",
            class: "number",
            action: ()=> this.handleInputChange("number", "5")
        },{
            id: "six",
            text: "6",
            class: "number",
            action: ()=> this.handleInputChange("number", "6")
        },{
            id: "subtract",
            text: "-",
            class: "operator",
            action: ()=> this.handleInputChange("operator", "-")
        },{
            id: "one",
            text: "1",
            class: "number",
            action: ()=> this.handleInputChange("number", "1")
        },{
            id: "two",
            text: "2",
            class: "number",
            action: ()=> this.handleInputChange("number", "2")
        },{
            id: "three",
            text: "3",
            class: "number",
            action: ()=> this.handleInputChange("number", "3")
        },{
            id: "equals",
            text: "=",
            class: "equals",
            action: ()=> this.handleInputChange("equals", "=")
        },{
            id: "zero",
            text: "0",
            class: "number",
            action: ()=> this.handleInputChange("number", "0")
        },{
            id: "decimal",
            class: "number decimal",
            text: ".",
            action: ()=> this.handleInputChange("number", ".")
        }]
        return (
            <div id="button-div">
                {
                    buttons.map((button)=>(
                        <button id={button.id} key={button.id} className={button.class} onClick={button.action}>{button.text}</button>
                    ))
                }
            </div>
        )
    }
    render() {
        return (
            <div id="calculator">
                {this.renderOutput()}
                {this.renderButtons()}
            </div>
        )
    }
}

//Functions


//Event Listeners


//Initialization
reactDivRoot.render(<Calculator />)