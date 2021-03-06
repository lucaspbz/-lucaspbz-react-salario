import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    let { children, label, color, discount } = this.props;
    discount === '0.00' || discount === undefined
      ? (discount = '')
      : (discount = ` (${discount}%)`);
    const value = `${children}${discount}`;
    return (
      <div>
        <label>{label}</label>
        <input
          readOnly
          value={value}
          style={{ fontWeight: 'bold', color: color }}
        />
      </div>
    );
  }
}
