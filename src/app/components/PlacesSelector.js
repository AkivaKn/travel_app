import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable"

export default function PlacesSelector({
  dayInputs,
  setDayInputs,
  index,
  day,
}) {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityList, setCityList] = useState([])

    useEffect(()=>{
      const apiCities = City.getCitiesOfState(
        selectedRegion?.countryCode,
        selectedRegion?.isoCode
      )
      console.log(apiCities, "<--apiCities")
      const cityNames = apiCities.map((city)=>{return {
        label: city.name,
        value: city.name
      }})
      console.log(cityNames, "<--cityNames")
      setCityList(cityNames)

    },[selectedRegion])

  const handleSelectCountryChange = (country,index) => {
    console.log(dayInputs,'day inputs');
    let itineraryDays = [...dayInputs];
    if(country){
      itineraryDays[index].country = country.name;
    } else{
      country=""
      itineraryDays[index].country = country
    }
      console.log(itineraryDays,'itinerary days')
      setDayInputs(itineraryDays);
      setSelectedCountry(country)
  };
  const handleSelectRegionChange = (region,index) => {
    console.log(dayInputs,'day inputs');
    let itineraryDays = [...dayInputs];
    if(region){
      itineraryDays[index].region = region.name;
    } else{
      region=""
      itineraryDays[index].region = region
    }
      console.log(itineraryDays,'itinerary days')
      setDayInputs(itineraryDays);
      setSelectedRegion(region)
  };
  const handleSelectCityChange = (city,index) => {
    console.log(dayInputs,'day inputs');
    let itineraryDays = [...dayInputs];
    console.log(city)
    if (city){
      itineraryDays[index].city = city.value
    } else {
      city=""
      itineraryDays[index].city = city
    }
      console.log(itineraryDays,'itinerary days')
      setDayInputs(itineraryDays);
      setSelectedCity(city)
  };


  return (
      <div className="App mb-7">
      <h1 className="font-satoshi font-normal text-base text-gray-700"
                  >Location</h1>
      <Select
        isClearable
        className="rounded-lg mt-2 text-sm text-gray-500 outline-0 "
        instanceId={1}
        name="country"
        placeholder="Country..."
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(country) => handleSelectCountryChange(country,index)}
      />
      <Select
        isClearable
        className=" rounded-lg mt-2 text-sm text-gray-500 outline-0"
        instanceId={2}
        name="region"
        placeholder="Region..."
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedRegion}
        onChange={(region) => handleSelectRegionChange(region,index)}
      />
      {/* <CreatableSelect 
        getNewOptionsData={(inputValue)=>{this.setState({inputValue})}}
        isClearable
        className="rounded-lg mt-2 text-sm text-gray-500 outline-0"
        instanceId={3}
        name="city"
        placeholder="City..."
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
        onChange={(city) => handleSelectCityChange(city,index)}
      /> */}
      <CreatableSelect 
      isClearable
      className="rounded-lg mt-2 text-sm text-gray-500 outline-0"
      instanceId={3}
      name="city"
      placeholder="City..."
      options={cityList}
      value={selectedCity}
      onChange={(city) => handleSelectCityChange(city,index)}
      // getOptionLabel={(options) => {
      //   return options["name"];
      // }}
      // getOptionValue={(options) => {
      //   return options["name"];
      // }}
      // formatCreateLabel={(inputValue)=>{
        // console.log(inputValue)
        // this.setState({name: inputValue})
        // }}
        />
    </div>
  );
}
