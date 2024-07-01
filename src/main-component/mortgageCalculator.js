export function mortageCalculator(amount, rate, term) {
  const interest = (amount * (rate * 0.01)) / (term * 12);
  const monthlyPayments = (amount / (term * 12) + interest).toFixed(2);
  return {
    interest: interest.toFixed(2),
    monthlyPayments,
    allPayments: monthlyPayments * (term * 12),
  };
}
