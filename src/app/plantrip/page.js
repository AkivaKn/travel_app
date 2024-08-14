"use client";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import ReactSlider from "react-slider";
import { filterItineraries, generateBudgetString } from "../utils/utils";
import { getItineraries } from "../lib/data/itineraries";
import ItineraryCard from "../components/ItineraryCard";

export default function PlanYourTrip() {
  const [budget, setBudget] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);
  const [allItineraries, setAllItineraries] = useState([]);
  const [itinerariesList, setItinerariesList] = useState([]);
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");

  useEffect(() => {
    const fetchItineraries = async () => {
      const itineraries = await getItineraries(minDays, maxDays);
      setAllItineraries(itineraries);
    };
    fetchItineraries();
  }, [minDays, maxDays]);

  useEffect(() => {
    const searchLocations = value.map((location) => location.value);
    const filteredItineraries = filterItineraries(
      allItineraries,
      searchLocations,
      budget
    );
    setItinerariesList(filteredItineraries);
  }, [allItineraries, budget, value]);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleMinDays = (event) => {
    setMinDays(event.target.value);
  };

  const handleMaxDays = (event) => {
    setMaxDays(event.target.value);
  };

  return (
    <section>
      <h1 className="text-center text-3xl mx-auto">Plan Your Trip</h1>
      <div className="flex flex-row ">
        <CreatableSelect
          instanceId="filterSelect"
          className="w-1/2 m-10 mx-auto"
          components={{
            DropdownIndicator: null,
          }}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={(newValue) => setValue(newValue)}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder="Type a location and press enter"
          value={value}
        />
      </div>

      <div className="w-1/2 mx-auto">
        <h1>Choose your budget: </h1>
        <ReactSlider
          id="slider"
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          onAfterChange={(newValue, thumbIndex) => {
            setBudget(newValue);
          }}
          min={1}
          max={3}
          renderThumb={(props, state) => (
            <div {...props} key={1}>
              {generateBudgetString(state.valueNow, "$")}
            </div>
          )}
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-center">Length of stay:</h1>
        <div className="flex flex-row justify-center">
          <label htmlFor="minDays">Min</label>
          <input
            id="minDays"
            type="number"
            value={minDays}
            onChange={handleMinDays}
          ></input>
          <label htmlFor="maxDays">Max</label>
          <input
            id="maxDays"
            type="number"
            value={maxDays}
            onChange={handleMaxDays}
          ></input>
        </div>
      </div>

      <ul className="flex flex-wrap justify-center mt-10">
          {itinerariesList.map((itinerary) => (
            <li key={itinerary.itinerary_id}>
              <ItineraryCard itinerary={itinerary} />
            </li>
          ))}
        </ul>
    </section>
  );
}
