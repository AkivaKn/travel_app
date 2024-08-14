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
    <div className='w-full max-w-full flex-center flex-col '>
      <form
        className='mt-10 w-full max-w-5xl flex flex-col gap-7 glassmorphism'
        action={createItinerary}>
        <section>
          <div className='mb-2 '>
            <label
              className='font-satoshi font-semibold text-base text-gray-700'
              htmlFor='title'>
              Title
            </label>
          </div>
          {errors.title && <p>{errors.title}</p>}

          <input
            className='form_input'
            id='title'
            name='title'
            type='text'
            placeholder='Enter itinerary title here...'
          />
        </section>

        <section>
          <div className='mb-2 block'>
            <label
              className='font-satoshi font-semibold text-base text-gray-700'
              htmlFor='itineraryDescription'>
              Description
            </label>
          </div>
          <textarea
            className='form_textarea'
            id='itineraryDescription'
            name='itineraryDescription'
            placeholder='Enter a short description of your itinerary here...'></textarea>
        </section>

        <section>
          <div className='mb-2 block'>
            <label
              className='font-satoshi font-semibold text-base text-gray-700'
              htmlFor='slider'>
              Budget
            </label>

            <input type='hidden' id='budget' name='budget' value={budget} />
          </div>

          <ReactSlider
            id='slider'
            className='horizontal-slider w-full'
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
        </section>

        <section>
          <div className='mb-2 block'>
            <label
              htmlFor='itineraryImage'
              className='font-satoshi font-semibold text-base text-gray-700'>
              Upload Image (max 4.5mb)
            </label>
          </div>
          <label>
            <input
              className='text-sm text-grey-500
              file:mr-5 file:py-3 file:px-10
              file:rounded-full file:border-0
              file:text-md file:font-semibold  file:text-white
              file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
              hover:file:cursor-pointer hover:file:opacity-80'
              id='itineraryImage'
              name='itineraryImage'
              type='file'
              accept='image/*'
            />
          </label>
        </section>

        <ul className='border-t-2 border-b-2 border-black gap-7' id='daysList'>
          {dayInputs.map((day, index) => {
            return (
              <li className='border-b-2 border-grey' key={index}>
                <h3 className='font-satoshi font-semibold text-base text-gray-700 py-2'>{`Day ${
                  index + 1
                }`}</h3>

                <section className='mb-7'>
                  <div className='mb-2 block'>
                    <label
                      className='font-satoshi font-normal text-base text-gray-700'
                      htmlFor='dayPlan'>
                      Day Plan
                    </label>
                  </div>
                  {errors.days?.map((error) => {
                    if (error.dayPlan && error.index === index) {
                      return <p key={error.index}>{error.dayPlan}</p>;
                    }
                  })}
                  <textarea
                    className='form_textarea'
                    id='dayPlan'
                    name='dayPlan'
                    value={day.dayPlan}
                    onChange={(event) => handleFormChange(index, event)}
                    placeholder="Describe the day's activities here..."></textarea>
                </section>

                <section className='mb-7'>
                  <div className='mb-2 block'>
                    <label
                      className='font-satoshi font-normal text-base text-gray-700'
                      htmlFor='transport'>
                      Transport
                    </label>
                  </div>
                  {errors.days?.map((error) => {
                    if (error.transport && error.index === index) {
                      return <p key={error.index}>{error.transport}</p>;
                    }
                  })}
                  <input
                    className='form_input'
                    id='transport'
                    name='transport'
                    type='text'
                    value={day.transport}
                    placeholder='Describe any transport used...'
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </section>
                <PlacesSelector
                  errors={errors}
                  dayInputs={dayInputs}
                  setDayInputs={setDayInputs}
                  index={index}
                  day={day}
                  key={index}
                />

                <section className='mb-7'>
                  <div className='mb-2 block'>
                    <label
                      className='font-satoshi font-normal text-base text-gray-700'
                      htmlFor='accomodation'>
                      Accomodation
                    </label>
                  </div>
                  {errors.days?.map((error) => {
                    if (error.accomodation && error.index === index) {
                      return <p key={error.index}>{error.accomodation}</p>;
                    }
                  })}
                  <input
                    className='form_input'
                    id='accomodation'
                    name='accomodation'
                    type='text'
                    placeholder='Recommend accomodation (optional)'
                    value={day.accomodation}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </section>
                <Button
                  className='red_btn my-5 w-52'
                  onClick={() => removeDay(index)}>
                  Remove Day
                </Button>
              </li>
            );
          })}
        </ul>

        <div className='w-full'>
          <Button className='outline_btn w-52' onClick={addAnotherDay}>
            Add Another Day
          </Button>
        </div>

        <Button className='black_btn' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}
