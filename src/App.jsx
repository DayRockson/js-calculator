import { useState } from "react"
import "./App.css"

function App() {
  const [answer, setAnswer] = useState("")
  const [expression, setExpression] = useState("")
  const et = expression.trim()

  const isOperator = symbol => {
    return /[*/+-]/.test(symbol)
  }

  const display = symbol => {
    if (symbol === "clear") {
      setAnswer("")
      setExpression("0")
    } else if (symbol === "negative") {
      if (answer === "") return
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      )
    } else if (symbol === "percent") {
      if (answer === "") return
      setAnswer((parseFloat(answer) / 100).toString())
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ")
    } else if (symbol === "=") {
      calculate()
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol)
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop()
      if (!lastNumber) return
      console.log("lastNumber :>> ", lastNumber)
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return
      setExpression(expression + symbol)
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol)
      } else {
        setExpression(expression + symbol)
      }
    }
  }

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ")
    const newParts = []

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i])
        let j = 0
        let k = i - 1
        while (isOperator(parts[k])) {
          k--
          j++
        }
        i -= j
      } else {
        newParts.unshift(parts[i])
      }
    }
    const newExpression = newParts.join(" ")
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression))
    } else {
      setAnswer(eval(newExpression))
    }
    setExpression("")
  }

  return (
    <>
      <div className="container">
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <div id="keys">
          <button
            id="clear"
            onClick={() => display("clear")}
            className="azure"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => display("negative")}
            className="azure"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => display("percentage")}
            className="azure"
          >
            %
          </button>
          <button
            id="divide"
            onClick={() => display("/")}
            className="operator"
          >
            /
          </button>
          <button
            id="seven"
            onClick={() => display("7")}
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => display("8")}
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => display("9")}
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => display("*")}
            className="operator"
          >
            *
          </button>
          <button
            id="four"
            onClick={() => display("4")}
          >
            4
          </button>
          <button
            id="five"
            onClick={() => display("5")}
          >
            5
          </button>
          <button
            id="six"
            onClick={() => display("6")}
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => display("-")}
            className="operator"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => display("1")}
          >
            1
          </button>
          <button
            id="two"
            onClick={() => display("2")}
          >
            2
          </button>
          <button
            id="three"
            onClick={() => display("3")}
          >
            3
          </button>
          <button id="add" onClick={() => display("+")} className="operator">
            +
          </button>
          <button
            id="zero"
            onClick={() => display("0")}
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => display(".")}
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => display("=")}
            className="operator"
          >
            =
          </button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
