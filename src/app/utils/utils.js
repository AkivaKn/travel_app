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
    return "$";
  } else if (budget === 2) {
    return "$$";
  } else if (budget === 3) {
    return "$$$";
  }
}

function generateBudgetString(length,char) {
  return Array.from({ length }, () => char).join('');
}

function filterItineraries(itineraries, locationArr, budget) {
  let filteredMatchScores=[...itineraries]
  if (locationArr){
      const matchScores=itineraries.map((itinerary)=>{
        itinerary.matchScore = 0
        locationArr.forEach((location)=>{
          const regex=new RegExp(location, "i")
          if(itinerary.country_list.map((country)=>regex.test(country)).includes(true)
            ||  itinerary.region_list.map((region)=>regex.test(region)).includes(true)
            || itinerary.place_list.map((place)=>regex.test(place)).includes(true))
            {itinerary.matchScore++}
        })
        return itinerary
        })
      filteredMatchScores = matchScores.filter((itinerary)=>itinerary.matchScore>0)
    }
  if(budget){
    filteredMatchScores.forEach((itinerary)=>{
      if(itinerary.budget===budget){
        itinerary.matchScore+=2
      }
    })
  }
  filteredMatchScores.sort((a,b)=>b.matchScore-a.matchScore)
  
    return filteredMatchScores
}

module.exports = {generateBudgetString, dateFormatting, formatBudget, filterItineraries };
