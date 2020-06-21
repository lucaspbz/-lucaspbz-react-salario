import React, { Component } from 'react';

import css from './app.module.css';
import { calculateSalaryFrom } from './salary.js';
import { formatReal, formatPercent } from './helpers/formatters';
import Bar from './components/bar/Bar';
import InputReadOnly from './components/inputReadOnly/InputReadOnly';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salarioBruto: 0,
      baseINSS: 0,
      discountINSS: 0,
      baseIRPF: 0,
      discountIRPF: 0,
      netSalary: 0,
    };
  }

  componentDidMount() {
    this.handleInputChange({ target: { value: 1000 } });
  }
  handleInputChange = (e) => {
    const salarioBruto = e.target.value;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(salarioBruto);

    this.setState({
      salarioBruto,
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    });
  };
  render() {
    const {
      salarioBruto,
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = this.state;

    const salarioLiquidoPercent = formatPercent(netSalary / salarioBruto);
    const inssPercent = formatPercent(discountINSS / salarioBruto);
    const irpfPercent = formatPercent(discountIRPF / salarioBruto);

    return (
      <div className="container">
        <div>
          <div className={css.header}>
            <h1>React Salário</h1>
          </div>
          <div>
            <div className="row">
              <div className="col l12 s12">
                <label className="teal-text" htmlFor="salaryInput">
                  Salário bruto
                </label>
                <input
                  type="number"
                  className="validate"
                  onChange={this.handleInputChange}
                  autoFocus
                  step="100"
                  min="0"
                  value={salarioBruto}
                  id="salaryInput"
                />
              </div>
            </div>

            <div className="row">
              <div className="col s6 m4 l3">
                <InputReadOnly label={'Base INSS:'}>
                  {formatReal(baseINSS)}
                </InputReadOnly>
              </div>

              <div className="col s6 m4 l3">
                <InputReadOnly
                  label={'Desconto INSS:'}
                  color={' #e67e22'}
                  discount={inssPercent}
                >
                  {formatReal(discountINSS)}
                </InputReadOnly>
              </div>

              <div className="col s6 m4 l3">
                <InputReadOnly label={'Base IRPF:'}>
                  {formatReal(baseIRPF)}
                </InputReadOnly>
              </div>

              <div className="col s6 m4 l3">
                <InputReadOnly
                  label={'Desconto IRPF:'}
                  color={'#c0392b'}
                  discount={irpfPercent}
                >
                  {formatReal(discountIRPF)}
                </InputReadOnly>
              </div>

              <div className="col s6 m4 l3">
                <InputReadOnly
                  label={'Salário líquido:'}
                  color={'#16a085'}
                  discount={salarioLiquidoPercent}
                >
                  {formatReal(netSalary)}
                </InputReadOnly>
              </div>
            </div>
          </div>
        </div>

        <Bar percents={{ inssPercent, irpfPercent }} />
      </div>
    );
  }
}
