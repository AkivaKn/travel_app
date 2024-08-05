import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useState } from "react";
export default function PlacesSelector({
  dayInputs,
  setDayInputs,
  index,
  errors,
}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectCountryChange = (country, index) => {
    console.log(dayInputs, "day inputs");
    let itineraryDays = [...dayInputs];
    itineraryDays[index].country = country.name;
    console.log(itineraryDays, "itinerary days");
    setDayInputs(itineraryDays);
    setSelectedCountry(country);
  };
  const handleSelectRegionChange = (region, index) => {
    console.log(dayInputs, "day inputs");
    let itineraryDays = [...dayInputs];
    itineraryDays[index].region = region.name;
    console.log(itineraryDays, "itinerary days");
    setDayInputs(itineraryDays);
    setSelectedRegion(region);
  };
  const handleSelectCityChange = (city, index) => {
    console.log(dayInputs, "day inputs");
    let itineraryDays = [...dayInputs];
    itineraryDays[index].city = city.name;
    console.log(itineraryDays, "itinerary days");
    setDayInputs(itineraryDays);
    setSelectedCity(city);
  };

  return (
    <div className='App'>
      {errors.days?.map((error) => {
        if (error.country && error.index === index) {
          return <p key={error.index}>{error.country}</p>;
        }
      })}
      <Select
        instanceId={1}
        name='country'
        placeholder='Country...'
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(country) => handleSelectCountryChange(country, index)}
      />
      {errors.days?.map((error) => {
        if (error.region && error.index === index) {
          return <p key={error.index}>{error.region}</p>;
        }
      })}
      <Select
        instanceId={2}
        name='region'
        placeholder='Region...'
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedRegion}
        onChange={(region) => handleSelectRegionChange(region, index)}
      />
      {errors.days?.map((error) => {
        if (error.city && error.index === index) {
          return <p key={error.index}>{error.city}</p>;
        }
      })}
      <Select
        instanceId={3}
        name='city'
        placeholder='City...'
        options={City.getCitiesOfState(
          selectedRegion?.countryCode,
          selectedRegion?.isoCode
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(city) => handleSelectCityChange(city, index)}
      />
    </div>
  );
}
