import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App


function round2(number,fractionDigits){  
  const {pow , round} = Math;
  return round(number*pow(10,fractionDigits))/pow(10,fractionDigits);  
   
}  

class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      tempnum: 0,
      op: "",
      mode: 0,
    };
    this.handlereset = this.handlereset.bind(this);

  }
  updateState() {
    this.setState({
      num: this.state.num,
      tempnum: this.state.tempnum,
      op: this.state.op,
      mode: this.state.mode,
    })
  }
  handlereset() {
    function reset() {

      this.state.num = 0;
      this.state.tempnum = 0;
      this.state.op ="";
      this.state.mode = 0;
      this.updateState();
    }
    reset = reset.bind(this);
    return reset;

  }
  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }
  handlenumber(temp) {
    function number() {
      if (this.state.mode === 0 || this.state.mode === 2){
        this.state.num = temp + 10*this.state.num;
      }
      else if (this.state.mode === 1){
        this.state.tempnum = this.state.num;
        this.state.num = temp;
        this.state.mode = 2;
      }
      this.updateState();
    }
    number = number.bind(this);
    return number;
  }
  
  handleoperator(temp) {
    function operator() {
      if(this.state.mode === 0 || this.state.mode === 1) {       
        this.state.mode = 1;
      }
      else if (this.state.mode === 2){
        console.log(this.state.op);
        this.calculate();
        this.state.mode = 1;
      }
      this.state.op = temp;

      this.updateState();
    }
    operator = operator.bind(this);
    return operator;
  }
  handlepercent (){
    function percent() {
      this.state.num = this.state.num /100 ; 
      this.state.mode = 1;
      this.updateState();
    }
    percent = percent.bind(this);
    return percent;
   

  }
  calculate(){
    const {num, tempnum, op } = this.state;
   
    if (op==="+"){
      this.state.num = tempnum + num;
      this.state.mode = 1;
    }
    else if (op==="-"){
      this.state.num = tempnum - num;
      this.state.mode = 1;
    }
    else if (op==="×"){
      this.state.num = tempnum * num;
      this.state.mode = 1;
    }
    else if (op==="÷"){
      this.state.num = tempnum / num;
      this.state.mode = 1;
    }
    else if (op==="="){
      this.state.mode = 2;
    }
    this.updateState();
  }
  
 

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.num}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handlereset}>AC</CalcButton>
            <CalcButton onClick={this.invert}>+/-</CalcButton>
            <CalcButton onClick={this.handlepercent}>%</CalcButton>
            <CalcButton onClick={this.handleoperator("÷")} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handlenumber(7)} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.handlenumber(8)} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.handlenumber(9)} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.handleoperator("×")} className="calc-operator">×</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handlenumber(4)} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.handlenumber(5)} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.handlenumber(6)} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.handleoperator("-")} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handlenumber(1)} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.handlenumber(2)} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.handlenumber(3)} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.handleoperator("+")} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handlenumber(0)} className="calc-number-0">0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton onClick={this.handleoperator("=")} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
