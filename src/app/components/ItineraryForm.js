"use client";
import { Button } from "flowbite-react";
import ReactSlider from "react-slider";
import { generateBudgetString } from "../utils/utils";
import { useState } from "react";

export default function ItineraryForm() {
  const [budget, setBudget] = useState(1);
  const [dayInputs, setDayInputs] = useState([
    {
      dayPlan: "",
      accomodation: "",
      transport: "",
      country: "",
      region: "",
      place: "",
    },
  ]);

  function removeDay(index) {
    let itineraryDays = [...dayInputs];
    itineraryDays.splice(index, 1);
    setDayInputs(itineraryDays);
  }
  const handleFormChange = (index, event) => {
    let itineraryDays = [...dayInputs];
    itineraryDays[index][event.target.name] = event.target.value;
    setDayInputs(itineraryDays);
  };

  function createItinerary(formData) {
    //post data to sql db
  }

  function addAnotherDay() {
    let newDayInput = {
      dayPlan: "",
      accomodation: "",
      transport: "",
      country: "",
      region: "",
      place: "",
    };
    setDayInputs([...dayInputs, newDayInput]);
  }

  return (
    <div className='h-screen flex max-height:100px max-width:100px m-3 p-3 border-black border-2'>
      <div className='grow'>
        <div>
          <form action={createItinerary}>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='title'>Title</label>
              </div>
              <input className='w-full' id='title' name='title' type='text' />
              {/* {errors.username && <p>{errors.username}</p>} */}
            </div>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='itinerary_description'>Description</label>
              </div>
              <textarea
                className='w-full'
                id='itinerary_description'
                name='itinerary_description'></textarea>
              {/* {errors.description && <p>{errors.description}</p>} */}
            </div>
            <div className='my-3'>
              <div className='mb-2 block'>
                <label htmlFor='slider'>Budget</label>
              </div>
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
                  <div {...props}>
                    {generateBudgetString(state.valueNow, "$")}
                  </div>
                )}
              />
              <input type='hidden' id='budget' name='budget' value={budget} />
              {/* {errors.password && <p>{errors.password}</p>} */}
            </div>

            <div>
              <div className='mb-2 block'>
                <label htmlFor='itinerary_image'>
                  Upload Image (max 4.5mb)
                </label>
              </div>
              <input
                className='w-full'
                id='itinerary_image'
                name='itinerary_image'
                type='file'
                accept='image/*'
              />
            </div>

            <ul className='w-full' id='daysList'>
              {dayInputs.map((day, index) => {
                return (
                  <>
                    <h3>{`Day ${index}`}</h3>
                    <div>
                      <div className='mb-2 block'>
                        <label htmlFor='dayPlan'>Day Plan</label>
                      </div>
                      <textarea
                        className='w-full'
                        id='dayPlan'
                        name='dayPlan'
                        value={day.dayPlan}
                        onChange={(event) =>
                          handleFormChange(index, event)
                        }></textarea>
                    </div>
                    <div>
                      <div className='mb-2 block'>
                        <label htmlFor='transport'>Transport</label>
                      </div>
                      <input
                        className='w-full'
                        id='transport'
                        name='transport'
                        type='text'
                        value={day.transport}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>

                    <div>
                      <div className='mb-2 block'>
                        <label htmlFor='country'>Country</label>
                      </div>
                      <input
                        className='w-full'
                        id='country'
                        name='country'
                        type='text'
                        value={day.country}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>

                    <div>
                      <div className='mb-2 block'>
                        <label htmlFor='region'>Region</label>
                      </div>
                      <input
                        className='w-full'
                        id='region'
                        name='region'
                        type='text'
                        value={day.region}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>

                    <div>
                      <div className='mb-2 block'>
                        <label htmlFor='place'>Place</label>
                      </div>
                      <input
                        className='w-full'
                        id='place'
                        name='place'
                        type='text'
                        value={day.place}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>

                    <div>
                      <div className='mb-2 block'>
                        <label htmlFor='accomodation'>Accomodation</label>
                      </div>
                      <input
                        className='w-full'
                        id='accomodation'
                        name='accomodation'
                        type='text'
                        value={day.accomodation}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>
                    <Button onClick={() => removeDay(index)}>Remove Day</Button>
                  </>
                );
              })}
            </ul>
            <Button onClick={addAnotherDay}>Add Another Day</Button>

            <div className='w-full'>
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
