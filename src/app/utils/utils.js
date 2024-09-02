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
function generateBudgetString(length, char) {
  return Array.from({ length }, () => char).join("");
}
function filterItineraries(
  allItineraries,
  locationArr,
  budget,
  minDays,
  maxDays
) {
  minDays ? null : (minDays = 0);
  maxDays ? null : (maxDays = 99999999);
  let filteredMatchScores = [];
  let itineraries = allItineraries.filter((itinerary) => {
    return (
      itinerary.number_of_days >= minDays && itinerary.number_of_days <= maxDays
    );
  });
  itineraries.forEach((itinerary) => {
    itinerary.matchScore = 0;
    filteredMatchScores.push(itinerary);
  });
  if (locationArr.length > 0) {
    const matchScores = itineraries.map((itinerary) => {
      locationArr.forEach((location) => {
        const regex = new RegExp(location, "i");
        if (
          itinerary.country_list
            .map((country) => regex.test(country))
            .includes(true) ||
          itinerary.region_list
            .map((region) => regex.test(region))
            .includes(true) ||
          itinerary.place_list.map((place) => regex.test(place)).includes(true)
        ) {
          itinerary.matchScore++;
        }
      });
      return itinerary;
    });
    filteredMatchScores = matchScores.filter(
      (itinerary) => itinerary.matchScore > 0
    );
  }
  if (budget) {
    filteredMatchScores.forEach((itinerary) => {
      if (itinerary.budget === budget) {
        itinerary.matchScore += 2;
      }
    });
  }
  filteredMatchScores.sort((a, b) => b.matchScore - a.matchScore);
  return filteredMatchScores;
}


async function getLatLongFromAddress(address) {
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; 
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Geocoding failed: ", data.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data: ", error);
    return null;
  }
}

function createMarker(){
  const canvas = document.createElement('canvas');
  const size = 20; // Set canvas size for the marker icon
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');

  // Draw circle
  context.fillStyle = '#FF0000'; // Background color
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.fill();

  // Draw text
  context.fillStyle = '#FFFFFF'; // Text color
  context.font = 'bold 16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("", size / 1, size /1)


  return canvas.toDataURL(); // Return the canvas content as a Data URL
};

function createStartMarker(){
  const canvas = document.createElement('canvas');
  const size = 20; // Set canvas size for the marker icon
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');

  // Draw circle
  context.fillStyle = '#00FF00'; // Background color
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.fill();

  // Draw text
  context.fillStyle = '#FFFFFF'; // Text color
  context.font = 'bold 16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("", size / 1, size /1)


  return canvas.toDataURL(); // Return the canvas content as a Data URL
};

function createEndMarker() {
  const canvas = document.createElement('canvas');
  const size = 20; // Set canvas size for the marker icon
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');

  // Draw circle background
  context.fillStyle = '#FFFFFF'; // White background for the circle
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.fill();

  // Checkerboard pattern inside the circle
  const numSquares = 4; // Define how many squares per row and column (4x4 grid)
  const squareSize = size / numSquares; // Size of each square

  for (let row = 0; row < numSquares; row++) {
    for (let col = 0; col < numSquares; col++) {
      // Check if the current square should be black or white
      if ((row + col) % 2 === 0) {
        context.fillStyle = '#000000'; // Black color
      } else {
        context.fillStyle = '#FFFFFF'; // White color
      }

      // Calculate the position of the square
      const x = col * squareSize;
      const y = row * squareSize;

      // Draw the square
      context.fillRect(x, y, squareSize, squareSize);
    }
  }

  // Clip the squares to fit inside the circle
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.fill();

  return canvas.toDataURL(); // Return the canvas content as a Data URL
}

function createStartEnd() {
  const canvas = document.createElement('canvas');
  const size = 20; // Set canvas size for the marker icon
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');

  // Draw left half (green)
  context.fillStyle = '#00FF00'; // Green color
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, Math.PI / 2, (3 * Math.PI) / 2); // Left half of the circle
  context.lineTo(size / 2, size / 2);
  context.closePath();
  context.fill();

  // Checkerboard pattern for the right half
  const numSquares = 4; // Define how many squares per row and column (4x4 grid)
  const squareSize = size / numSquares; // Size of each square

  for (let row = 0; row < numSquares; row++) {
    for (let col = 0; col < numSquares; col++) {
      // Check if the current square should be black or white
      if ((row + col) % 2 === 0) {
        context.fillStyle = '#000000'; // Black color
      } else {
        context.fillStyle = '#FFFFFF'; // White color
      }

      // Calculate the position of the square
      const x = col * squareSize;
      const y = row * squareSize;

      // Only draw squares that are in the right half of the circle
      if (x >= size / 2) {
        context.fillRect(x, y, squareSize, squareSize);
      }
    }
  }

  // Clip the squares to fit inside the circle
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.fill();

  return canvas.toDataURL(); // Return the canvas content as a Data URL
}




module.exports = {
  generateBudgetString,
  dateFormatting,
  formatBudget,
  filterItineraries,
  getLatLongFromAddress,
  createMarker,
  createStartMarker,
  createEndMarker,
  createStartEnd
};

