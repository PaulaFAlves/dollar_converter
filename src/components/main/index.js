import React, { useState, Component } from 'react';
import api from '../../services/api'
 
import './styles.css';

export default class Convert extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      quote: '',
      tax: '',
      action: '',
      iof: '',
      resultDollarWithFee: '',
      resultNoFee: '',
      resultWithFee: ''
    }
  }

  handleChangeValue = (event) => {
    this.setState({value: event.target.value})   
  }
  handleChangeTax = (event) => {
    this.setState({tax: event.target.value})
  }
  handlePaymentOption = (event) => {
    this.setState({action: event.target.value});
  }
  

  handleConvert = (e) => {
    e.preventDefault();

    let quote = 5.12
    let iof = 0
    let value = parseFloat(this.state.value).toFixed(2)
    let tax = (1 + (parseFloat(this.state.tax) / 100))
    this.setState({ quote: quote })

    const data = api.get('')
    
    if (this.state.action === "cash") {
      iof = 1.1
      this.setState({ iof: iof})
      console.log(this.stateiof)   
    } else if (this.state.action === "credit") {
      iof = 6.4
      this.setState({ iof: iof})
      console.log(this.stateiof)
    } 
    // convert dollar with fee
    iof =  (1 + (this.state.iof / 100))
    let sumDollarWithFee = (value * iof * tax).toFixed(2)
    this.setState({ resultDollarWithFee: sumDollarWithFee })
    // convert no fee
    let sumNoFee = (value * quote).toFixed(2)
    this.setState({ resultNoFee: sumNoFee })
    // convert with fee
    let sumWithFee = ((value * tax) * (quote * iof)).toFixed(2)
    this.setState({ resultWithFee: sumWithFee })    
  }
  render() {
    return (
      <div className="main">
        <div>
          <div className="inputValues">
            <label className="labelInput"> Value:</label>
              <input 
                type="number"
                id="value"
                placeholder=" enter the value here "
                onChange={this.handleChangeValue}
                value={this.state.value}
              />   
            <label className="labelInput"> Tax:</label>
              <input 
                type="number"
                id="tax"
                placeholder=" enter the tax here "
                onChange={this.handleChangeTax}
                value={this.state.tax}
              />  
          </div>

        </div>
        <div className="mainButton" onChange={this.convert}>
          <p>Payment Options: </p>
          <input 
            type="radio" 
            value="cash"
            name="option"
            checked={this.state.action === "cash"}
            onChange={this.handlePaymentOption}/><p>Cash</p>
          <input 
            type="radio" 
            value="credit" 
            name="option"
            checked={this.state.action === "credit"}
            onChange={this.handlePaymentOption}/><p>Credit Card</p>
          </div>


          <div className="button">
              <button onClick={this.handleConvert}>Convert</button>
              
          </div> 
          <div>
            <div className="results">
              <p>Dollar quote - R$:</p>
              <p>{this.state.quote}</p>
            </div>
            <div className="results">   
              <p>IOF - %:</p>
              <p>{this.state.iof}</p>
            </div>
            <div className="results">   
              <p>US$:</p>
              <p>{this.state.value}</p>
            </div>
            <div className="results">   
              <p>US$ with fee:</p>
              <p>{this.state.resultDollarWithFee}</p>
            </div>
            <div className="results">   
              <p>R$:</p>
              <p>{this.state.resultNoFee}</p>
            </div>
            <div className="results">   
              <p>R$ with fee:</p>
              <p>{this.state.resultWithFee}</p>
            </div>
          </div>

</div>
    
          )
        
        
}}