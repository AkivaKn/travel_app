"use client";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import ReactSlider from "react-slider";
import { filterItineraries, generateBudgetString } from "../utils/utils";
import { getItineraries } from "../lib/data/itineraries";
import Typewriter from "typewriter-effect";
import ItinerariesList from "./ItinerariesList";

export default function ItinerariesSection({ session }) {
  const [budget, setBudget] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);
  const [allItineraries, setAllItineraries] = useState([]);
  const [itinerariesList, setItinerariesList] = useState([]);
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      const itineraries = await getItineraries();
      setAllItineraries(itineraries);
    };
    fetchItineraries();
  }, []);

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

  useEffect(() => {
    const searchLocations = value.map((location) => location.value);
    const filteredItineraries = filterItineraries(
      allItineraries,
      searchLocations,
      budget,
      minDays,
      maxDays
    );

    setItinerariesList(filteredItineraries);
  }, [allItineraries, filter]);

  const handleClick = () => {
    setFilter(!filter);
  };

  return (
    <section className=" w-full flex-center flex-col p-4">
      <div className="mt-10 w-full max-w-5xl flex flex-col gap-7 glassmorphism">
        <div className=" w-full mx-auto">
          <h1 className="font-satoshi font-semibold text-base text-gray-700 mb-2 mt-4">
            Where do you want to go?
          </h1>
          <form>
            <CreatableSelect
              instanceId="filterSelect"
              className="w-full"
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
          </form>
        </div>
        <div className="w-full mx-auto ">
          <h1 className="font-satoshi font-semibold text-base text-gray-700 mb-2 mt-4">
            Choose your budget:{" "}
          </h1>
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
        <div className="w-full mx-auto">
          <h1 className="font-satoshi font-semibold text-base text-gray-700 mb-2">
            Length of stay:
          </h1>
          <div className="flex flex-row flex-wrap items-center justify-between mx-auto gap-5">
            <input
              placeholder="Min stay (days)"
              className="form_input w-full sm:w-1/4"
              id="minDays"
              type="number"
              value={minDays}
              onChange={handleMinDays}
            ></input>
            <input
              placeholder="Max stay (days)"
              className="form_input w-full sm:w-1/4"
              id="maxDays"
              type="number"
              value={maxDays}
              onChange={handleMaxDays}
            ></input>
            <button
              className=" black_btn justify-start w-full sm:w-1/4"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl">
        <ItinerariesList session={session} itineraries={itinerariesList} />
      </div>
    </section>
  );
}
