"use client";
import { Button } from "flowbite-react";
import ReactSlider from "react-slider";
import { generateBudgetString } from "../utils/utils";
import { useState } from "react";
import PlacesSelector from "./PlacesSelector";
import { postItinerary } from "../lib/data/itineraries";
import { validateItinerariesForm } from "../utils/validation_utils";

export default function ItineraryForm() {
  const [budget, setBudget] = useState(1);
  const [dayInputs, setDayInputs] = useState([
    {
      dayPlan: "",
      accomodation: "",
      transport: "",
      country: "",
      region: "",
      city: "",
    },
  ]);

  const [errors, setErrors] = useState({});

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
    const title = formData.get("title");
    const formErrors = validateItinerariesForm(title, dayInputs);
    setErrors(formErrors);
    if (!formErrors.title && formErrors.days.length === 0) {
      postItinerary(formData, dayInputs);
    }
  }

  function addAnotherDay() {
    let newDayInput = {
      dayPlan: "",
      accomodation: "",
      transport: "",
      country: "",
      region: "",
      city: "",
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
              {errors.title && <p>{errors.title}</p>}
              <input className='w-full' id='title' name='title' type='text' />
            </div>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='itineraryDescription'>Description</label>
              </div>
              <textarea
                className='w-full'
                id='itineraryDescription'
                name='itineraryDescription'></textarea>
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
                  <div {...props} key={1}>
                    {generateBudgetString(state.valueNow, "$")}
                  </div>
                )}
              />
              <input type='hidden' id='budget' name='budget' value={budget} />
            </div>

            <div>
              <div className='mb-2 block'>
                <label htmlFor='itineraryImage'>Upload Image (max 4.5mb)</label>
              </div>
              <input
                className='w-full'
                id='itineraryImage'
                name='itineraryImage'
                type='file'
                accept='image/*'
              />
            </div>
            <ul className='w-full' id='daysList'>
              {dayInputs.map((day, index) => {
                return (
                  <li key={index}>
                    <h3>{`Day ${index + 1}`}</h3>
                    <div key={index + 1}>
                      <div className='mb-2 block'>
                        <label htmlFor='dayPlan'>Day Plan</label>
                      </div>
                      {errors.days?.map((error) => {
                        if (error.dayPlan && error.index === index) {
                          return <p key={error.index}>{error.dayPlan}</p>;
                        }
                      })}
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
                      {errors.days?.map((error) => {
                        if (error.transport && error.index === index) {
                          return <p key={error.index}>{error.transport}</p>;
                        }
                      })}
                      <input
                        className='w-full'
                        id='transport'
                        name='transport'
                        type='text'
                        value={day.transport}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>
                    <PlacesSelector
                      errors={errors}
                      dayInputs={dayInputs}
                      setDayInputs={setDayInputs}
                      index={index}
                      day={day}
                      key={index}
                    />

                    <div>
                      <div className='mb-2 block'>
                        <label htmlFor='accomodation'>Accomodation</label>
                      </div>
                      {errors.days?.map((error) => {
                        if (error.accomodation && error.index === index) {
                          return <p key={error.index}>{error.accomodation}</p>;
                        }
                      })}
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
                  </li>
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
