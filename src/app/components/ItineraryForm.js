"use client";
import { Button } from "flowbite-react";
import ReactSlider from "react-slider";
import { generateBudgetString } from "../utils/utils";
import { useState } from "react";

export default function ItineraryForm() {
  const [budget, setBudget] = useState(1);
  function createItinerary(formData) {
    //post data to sql db
  }
    
    function addDay() {
        
    }

  return (
    <div className="h-screen flex max-height:100px max-width:100px m-3 p-3 border-black border-2">
      <div className="grow">
        <div>
          <form action={createItinerary}>
            <div>
              <div className="mb-2 block">
                <label htmlFor="title">Title</label>
              </div>
              <input className="w-full" id="title" name="title" type="text" />
              {/* {errors.username && <p>{errors.username}</p>} */}
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="itinerary_description">Description</label>
              </div>
              <textarea
                className="w-full"
                id="itinerary_description"
                name="itinerary_description"
              ></textarea>
              {/* {errors.description && <p>{errors.description}</p>} */}
            </div>
            <div className="my-3">
              <div className="mb-2 block">
                <label htmlFor="slider">Budget</label>
              </div>
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
                  <div {...props}>
                    {generateBudgetString(state.valueNow, "$")}
                  </div>
                )}
              />
              <input type="hidden" id="budget" name="budget" value={budget} />
              {/* {errors.password && <p>{errors.password}</p>} */}
            </div>

            <div>
              <div className="mb-2 block">
                <label htmlFor="itinerary_image">
                  Upload Image (max 4.5mb)
                </label>
              </div>
              <input
                className="w-full"
                id="itinerary_image"
                name="itinerary_image"
                type="file"
                accept="image/*"
              />
            </div>

            <ul className="w-full" id='daysList'>
            </ul>
            <Button onClick={addDay}>Add Day</Button>
            <div className="w-full">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
