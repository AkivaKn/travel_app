"use client";
import { useState } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import ReactSlider from "react-slider";
import { generateBudgetString } from "../utils/utils";

export default function PlanYourTrip() {
  const [budget, setBudget] = useState(1);
  const [tags, setTags] = useState([]);

  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   setInput(event.target.value);
  // };

  const handleAddition = (tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleClick = (event) => {
    console.log(event);
    //setInput(event.target.value);
  };

  const handleDrag = (tags, currPosition, newPosition) => {
    console.log(tag);
    const newTags = [...tags];
    newTags.splice(currPosition, 1);
    newTags.splice(newPosition, 0, tags);
    // re-render
    setTags(newTags);
  };

  return (
    <>
      <h1 className='text-center text-3xl m-10'>Plan Your Trip</h1>
      <div className='flex flex-row gap-6'>
        <ReactTags
          classNames={{
            tags: "flex flex-wrap",
            tagInput: "border p-1 rounded",
            tag: "bg-blue-200 flex justify-center items-center m-1 rounded px-2",
            remove: "bg-red-500 text-white p-1 ml-2 cursor-pointer rounded",
          }}
          tags={tags}
          //suggestions={suggestions}
          separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          //handleDrag={handleDrag}
          //onTagUpdate={onTagUpdate}
          //inputFieldPosition="bottom"
          //editable
          //clearAll
          //onClearAll={onClearAll}
          maxTags={5}
        />
        <button className='black_btn' onClick={handleClick}>
          Search
        </button>
        <div>
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
      </div>
    </>
  );
}
