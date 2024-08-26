import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { MdOutlineClose } from "react-icons/md";

export default function PlacesSelector({
  dayInputs,
  setDayInputs,
  index,
  errors,
  day,
  setErrors
}) {
  const [selectedCountry, setSelectedCountry] = useState(
    day.country ? { name: day.country } : null
  );
  const [selectedRegion, setSelectedRegion] = useState(
    day.region ? { name: day.region } : null
  );
  const [selectedCity, setSelectedCity] = useState(
    day.city ? { label: day.city } : null
  );
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const apiCities = City.getCitiesOfState(
      selectedRegion?.countryCode,
      selectedRegion?.isoCode
    );
    const cityNames = apiCities.map((city) => {
      return {
        label: city.name,
        value: city.name,
      };
    });
    setCityList(cityNames);
  }, [selectedRegion]);

  const handleSelectCountryChange = (country, index) => {
    let itineraryDays = [...dayInputs];

    if (country) {
      itineraryDays[index].country = country.name;
    } else {
      country = "";
      itineraryDays[index].country = country;
    }
    setDayInputs(itineraryDays);
    setSelectedCountry(country);
  };

  const handleSelectRegionChange = (region, index) => {
    let itineraryDays = [...dayInputs];

    if (region) {
      itineraryDays[index].region = region.name;
    } else {
      region = "";
      itineraryDays[index].region = region;
    }
    setDayInputs(itineraryDays);
    setSelectedRegion(region);
  };

  const handleSelectCityChange = (city, index) => {
    let itineraryDays = [...dayInputs];

    if (city) {
      itineraryDays[index].city = city.value;
    } else {
      city = "";
      itineraryDays[index].city = city;
    }

    setDayInputs(itineraryDays);
    setSelectedCity(city);
  };

  return (
    <div className='App mb-7'>
      <h1 className='font-satoshi font-normal text-base text-gray-700'>
        Location
      </h1>
     

      <Select
        isClearable
        className='rounded-lg mt-2 text-sm text-gray-500 outline-0 '
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
                      if (error.country && error.index === index) {
                        return (
                          <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                            role="alert"
                            key={error.index}
                          >
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">
                              {error.country}
                            </span>
                            <button
                              className="absolute top-0 bottom-0 right-0 px-2"
                              onClick={() => {
                                setErrors(() => {
                                  let newDaysErrors = [];
                                  errors.days.forEach((error) => {
                                    if (!error.country || error.index !== index) {
                                      newDaysErrors.push(error)
                                    };
                                  });
                                  let newErrors = { ...errors }
                                  newErrors.days = newDaysErrors;
                                  return newErrors
                                });
                              }}
                            >
                              <MdOutlineClose />
                            </button>
                          </div>
                        );
                      }
                    })}
     
      <Select
        isClearable
        className=' rounded-lg mt-2 text-sm text-gray-500 outline-0'
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
                      if (error.region && error.index === index) {
                        return (
                          <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                            role="alert"
                            key={error.index}
                          >
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">
                              {error.region}
                            </span>
                            <button
                              className="absolute top-0 bottom-0 right-0 px-2"
                              onClick={() => {
                                setErrors(() => {
                                  let newDaysErrors = [];
                                  errors.days.forEach((error) => {
                                    if (!error.region || error.index !== index) {
                                      newDaysErrors.push(error)
                                    };
                                  });
                                  let newErrors = { ...errors }
                                  newErrors.days = newDaysErrors;
                                  return newErrors
                                });
                              }}
                            >
                              <MdOutlineClose />
                            </button>
                          </div>
                        );
                      }
                    })}

     
      <CreatableSelect
        isClearable
        className='rounded-lg mt-2 text-sm text-gray-500 outline-0'
        instanceId={3}
        name='city'
        placeholder='City...'
        options={cityList}
        value={selectedCity}
        onChange={(city) => handleSelectCityChange(city, index)}
      />
       {errors.days?.map((error) => {
                      if (error.city && error.index === index) {
                        return (
                          <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                            role="alert"
                            key={error.index}
                          >
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">
                              {error.city}
                            </span>
                            <button
                              className="absolute top-0 bottom-0 right-0 px-2"
                              onClick={() => {
                                setErrors(() => {
                                  let newDaysErrors = [];
                                  errors.days.forEach((error) => {
                                    if (!error.city || error.index !== index) {
                                      newDaysErrors.push(error)
                                    };
                                  });
                                  let newErrors = { ...errors }
                                  newErrors.days = newDaysErrors;
                                  return newErrors
                                });
                              }}
                            >
                              <MdOutlineClose />
                            </button>
                          </div>
                        );
                      }
                    })}
    </div>
  );
}
