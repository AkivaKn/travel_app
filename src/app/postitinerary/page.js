"use client";
import { postItinerary } from "../lib/data/itineraries";

export default function PostItinerary() {

  async function createItinerary(formData) {
    // const posted = await postItinerary(formData)
    // console.log(posted);
  }
  return (
    <div>
      <h1 className="text-center text-3xl m-10">Post Itinerary</h1>
      <form action={createItinerary}>
        <label htmlFor="title">Title</label>
        <input
          className="w-full"
          id="title"
          name="title"
          type="text"
        ></input>

        <label htmlFor="description">Description</label>
        <input
          className="w-full"
          id="description"
          name="description"
          type="text"
        ></input>

        <label htmlFor="budget">Budget</label>
        <input
          className="w-full"
          id="budget"
          name="budget"
          type="number"
        ></input>

        <label htmlFor="image">Itinerary Image</label>
        <input
          className="w-full"
          id="image"
          name="image"
          type="file"
          accept="image/*"
        ></input>
      <button type="submit"> Post Itinerary</button>
      </form>
    </div>
  );
}
