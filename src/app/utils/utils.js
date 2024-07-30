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
    return "Low budget holiday";
  } else if (budget === 2) {
    return "Medium budget holiday";
  } else if (budget === 3) {
    return "Luxury holiday";
  }
}

module.exports = { dateFormatting, formatBudget };
