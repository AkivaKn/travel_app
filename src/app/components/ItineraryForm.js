"use client";
import ReactSlider from "react-slider";
import { generateBudgetString } from "../utils/utils";
import { useState } from "react";
import PlacesSelector from "./PlacesSelector";
import { patchItinerary, postItinerary } from "../lib/data/itineraries";
import { validateItinerariesForm } from "../utils/validation_utils";
import { useRouter } from "next/navigation";

export default function UpdateItineraryForm({ itinerary, page }) {
  const router = useRouter();
  let newItineraryDays;
  let newBudget;
  if (itinerary) {
    const { itineraryDays, itineraryInfo } = itinerary;

    newItineraryDays = itineraryDays.map((itinerary) => {
      return {
        dayPlan: itinerary.day_plan,
        accomodation: itinerary.accomodation,
        transport: itinerary.transport,
        country: itinerary.country,
        region: itinerary.region,
        city: itinerary.place,
      };
    });

    newBudget = itineraryInfo.budget;
  } else {
    newItineraryDays = [
      {
        dayPlan: "",
        accomodation: "",
        transport: "",
        country: "",
        region: "",
        city: "",
      },
    ];
    newBudget = 1;
  }

  const [budget, setBudget] = useState(newBudget);
  const [dayInputs, setDayInputs] = useState(newItineraryDays);
  const [errors, setErrors] = useState({});
  const [showImage, setShowImage] = useState(true);
  const [image, setImage] = useState(
    itinerary?.itineraryInfo?.itinerary_image_url
  );

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

  async function createItinerary(formData) {
    const title = formData.get("title");

    const formErrors = validateItinerariesForm(title, dayInputs);
    setErrors(formErrors);
    if (!formErrors.title && formErrors.days.length === 0) {
      try {
        let itineraryId;
        if (page === "post") {
          const newItinerary = await postItinerary(formData, dayInputs);
          itineraryId = newItinerary.itineraryInfo.itinerary_id;
        } else if (page === "patch") {
          await patchItinerary(
            formData,
            dayInputs,
            itinerary.itineraryInfo.itinerary_id,
            itinerary.itineraryInfo.itinerary_image_url
          );
          itineraryId = itinerary.itineraryInfo.itinerary_id;
        }
        router.replace(`/itinerary/${itineraryId}`);
      } catch (error) {}
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

  function handleShowImage() {
    setImage(image);
    setShowImage(false);
  }

  return (
    <div className="w-full max-w-full flex-center flex-col ">
      <form
        className="mt-10 w-full max-w-5xl flex flex-col gap-7 glassmorphism"
        action={createItinerary}
      >
        <section>
          <div className="mb-2 ">
            <label
              className="font-satoshi font-semibold text-base text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
          </div>
          {errors.title && <p>{errors.title}</p>}

          <input
            className="form_input"
            id="title"
            name="title"
            type="text"
            placeholder="Enter itinerary title here..."
            defaultValue={itinerary?.itineraryInfo?.title}
          />
        </section>

        <section>
          <div className="mb-2 block">
            <label
              className="font-satoshi font-semibold text-base text-gray-700"
              htmlFor="itineraryDescription"
            >
              Description
            </label>
          </div>
          <textarea
            className="form_textarea h-[200px]"
            id="itineraryDescription"
            name="itineraryDescription"
            placeholder="Enter a short description of your itinerary here...
            "
            defaultValue={itinerary?.itineraryInfo?.itinerary_description}
          ></textarea>
        </section>

        <section>
          <div className="mb-2 block">
            <label
              className="font-satoshi font-semibold text-base text-gray-700"
              htmlFor="slider"
            >
              Budget
            </label>

            <input type="hidden" id="budget" name="budget" value={budget} />
          </div>

          <ReactSlider
            id="slider"
            className="horizontal-slider w-full"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={budget}
            onAfterChange={(newValue, thumbIndex) => {
              //console.log(newValue, "<--new value budget");
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
          <img src={image} />
          <div className="mb-2 block">
            <label
              htmlFor="itineraryImage"
              className="font-satoshi font-semibold text-base text-gray-700"
            >
              Upload Image (max 4.5mb)
            </label>
          </div>
          <label>
            <input
              className="text-sm text-grey-500
              file:mr-5 file:py-3 file:px-10
              file:rounded-full file:border-0
              file:text-md file:font-semibold  file:text-white
              file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
              hover:file:cursor-pointer hover:file:opacity-80"
              id="itineraryImage"
              name="itineraryImage"
              type="file"
              accept="image/*"
              onChange={handleShowImage}
            />
          </label>
        </section>

        <ul className="border-t-2 border-b-2 border-black gap-7" id="daysList">
          {dayInputs.map((day, index) => {
            return (
              <li className="border-b-2 border-grey" key={index}>
                <h3 className="font-satoshi font-semibold text-base text-gray-700 py-2">{`Day ${
                  index + 1
                }`}</h3>

                <section className="mb-7">
                  <div className="mb-2 block">
                    <label
                      className="font-satoshi font-normal text-base text-gray-700"
                      htmlFor="dayPlan"
                    >
                      Day Plan
                    </label>
                  </div>
                  {errors.days?.map((error) => {
                    if (error.dayPlan && error.index === index) {
                      return <p key={error.index}>{error.dayPlan}</p>;
                    }
                  })}
                  <textarea
                    className="form_textarea h-[200px]"
                    id="dayPlan"
                    name="dayPlan"
                    value={day.dayPlan}
                    onChange={(event) => handleFormChange(index, event)}
                    placeholder="Describe the day's activities here..."
                  ></textarea>
                </section>

                <section className="mb-7">
                  <div className="mb-2 block">
                    <label
                      className="font-satoshi font-normal text-base text-gray-700"
                      htmlFor="transport"
                    >
                      Transport
                    </label>
                  </div>
                  {errors.days?.map((error) => {
                    if (error.transport && error.index === index) {
                      return <p key={error.index}>{error.transport}</p>;
                    }
                  })}
                  <input
                    className="form_input"
                    id="transport"
                    name="transport"
                    type="text"
                    value={day.transport}
                    placeholder="Describe any transport used..."
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

                <section className="mb-7">
                  <div className="mb-2 block">
                    <label
                      className="font-satoshi font-normal text-base text-gray-700"
                      htmlFor="accomodation"
                    >
                      Accomodation
                    </label>
                  </div>
                  {errors.days?.map((error) => {
                    if (error.accomodation && error.index === index) {
                      return <p key={error.index}>{error.accomodation}</p>;
                    }
                  })}
                  <input
                    className="form_input"
                    id="accomodation"
                    name="accomodation"
                    type="text"
                    placeholder="Recommend accomodation (optional)"
                    value={day.accomodation}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </section>
                <button
                  className="red_btn my-5 w-52"
                  onClick={() => removeDay(index)}
                >
                  Remove Day
                </button>
              </li>
            );
          })}
        </ul>

        <div className="w-full">
          <button className="outline_btn w-52" onClick={addAnotherDay}>
            Add Another Day
          </button>
        </div>

        <button className="black_btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
