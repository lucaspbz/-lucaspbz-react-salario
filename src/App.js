import React, { Component } from 'react';

import css from './app.module.css';
import { calculateSalaryFrom } from './salary';
import { formatReal, formatPercent } from './helpers/formatters';
import Bar from './components/bar/Bar';

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
    const irpfPercent = formatPercent(discountIRPF / salarioBruto);
    const inssPercent = formatPercent(discountINSS / salarioBruto);

    return (
      <div className="container">
        <div>
          <div className={css.header}>
            <h1>React Salário</h1>
          </div>
          <div>
            <label className={'teal-text '}>Salário bruto</label>
            <input
              type="text"
              className="validate text-bold"
              style={{ borderBottom: '2px solid #26A69A' }}
              onChange={this.handleInputChange}
            />
            <div className={css.itemsGroup}>
              <div className={css.item}>
                <label>Base INSS:</label>
                <input readOnly value={formatReal(baseINSS)} />
              </div>

              <div className={css.item}>
                <label>Desconto INSS:</label>
                <input
                  className="orange-text"
                  readOnly
                  value={`${formatReal(discountINSS)} (${inssPercent}%)`}
                />
              </div>

              <div className={css.item}>
                <label>Base IRPF:</label>
                <input readOnly value={formatReal(baseIRPF)} />
              </div>

              <div className={css.item}>
                <label>Desconto IRPF</label>
                <input
                  className="red-text"
                  readOnly
                  value={`${formatReal(discountIRPF)} (${irpfPercent}%)`}
                />
              </div>
            </div>
          </div>
          <div className={css.liquido}>
            <label>Salário líquido:</label>
            <input
              className=" teal-text"
              readOnly
              value={`${formatReal(netSalary)} (${salarioLiquidoPercent}%)`}
            />
          </div>
        </div>

        <Bar percents={{ inssPercent, irpfPercent }} />
      </div>
    );
  }
}
