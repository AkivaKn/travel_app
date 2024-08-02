function dateFormatting(date) {
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
  return formattedDate;
}

function formatBudget(budget) {
  if (budget === 1) {
    return "Budget: $";
  } else if (budget === 2) {
    return "Budget: $$";
  } else if (budget === 3) {
    return "Budget: $$$";
  }
}

function generateBudgetString(length,char) {
  return Array.from({ length }, () => char).join('');
}
module.exports = {generateBudgetString, dateFormatting, formatBudget };
