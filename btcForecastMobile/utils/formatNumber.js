export const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + ' B'; // Billion
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + ' M'; // Million
    }
    return num.toFixed(2); // Keep as is for smaller numbers
  };