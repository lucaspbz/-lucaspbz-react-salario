function formatReal(value) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formatter.format(value);
}

function formatPercent(value) {
  Number.isNaN(value) ? (value = 0) : (value *= 100);
  return `${value.toFixed(2)}`;
}

export { formatReal, formatPercent };
