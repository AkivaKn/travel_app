"use client";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import ReactSlider from "react-slider";
import { generateBudgetString } from "../utils/utils";

export default function PlanYourTrip() {
  const [budget, setBudget] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);

  // const handleClick = (event) => {
  //   console.log(event);
  //   //setInput(event.target.value);
  // };

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

  return (
    <section>
      <h1 className='text-center text-3xl mx-auto'>Plan Your Trip</h1>
      <div className='flex flex-row '>
        <CreatableSelect
          className='w-1/2 m-10 mx-auto'
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
          placeholder='Type something and press enter...'
          value={value}
        />
        {/* <button className='black_btn' onClick={handleClick}>
          Search
        </button> */}
      </div>

      <div className='w-1/2 mx-auto'>
        <h1>Choose your budget: </h1>
        <ReactSlider
          id='slider'
          className='horizontal-slider'
          thumbClassName='example-thumb'
          trackClassName='example-track'
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

      <div className='flex flex-col'>
        <h1 className='text-center'>Length of stay:</h1>
        <div className='flex flex-row justify-center'>
          <label>Min</label>
          <input></input>
          <label>Max</label>
          <input></input>
        </div>
      </div>
    </section>
  );
}
