# TravelApp

[Hosted Site](https://travel-app-vert-five.vercel.app/)

## Contributors

[Akiva Kaufman](https://github.com/AkivaKn)

[Alex Greaves](https://github.com/AGreaves99)

[Alex Straton](https://github.com/AlexStraton)

[Joe Mosley](https://github.com/JoeMosley96)

## Project Description

A travel application that allows users to search for itineraries and plan trips based on their preferences. The app helps users select destinations, filter by activities or points of interest, and organise their travel itineraries.

Users can:

- Share and explore travel itineraries
- Comment and vote on itineraries
- Search and filter by budget, location and trip length

## Technologies used

- Next.js (App Router)
- React
- Auth.js
- TailwindCSS
- Vercel Postgres
- Vercel Blob
- Google Maps API

## Setup

You will need to have Node.js and npm installed globally on your machine.

Clone the repo

```bash
git clone https://github.com/AkivaKn/travel_app.git
```

Install dependencies

```bash
npm install
```

Setup a Vercel Postgres database and Vercel Blob database
Follow this get started link: https://vercel.com/docs/getting-started-with-vercel

Create a .env file in the root directory. Copy the environment variables from the settings tab in both databases and paste them in the .env file.

Generate auth secret

```bash
npx auth secret
```

Add it to the .env file using the following syntax:

AUTH_SECRET="<your_auth_secret_code_here>"

To enable the Google maps feature, get a Google maps API key
(https://developers.google.com/maps/documentation) and add the API key to the .env file using the following syntax: NEXT_PUBLIC_REACT_APP_API_KEY="<your_api_key_here>"

Seed the database

```bash
npm run seed
```

Run the app

```bash
npm run dev
```

## Approach

We approached the development of the app by focusing on the user experience. Using user stories, we identified key features and thought about the user journey. To guide the design, we created wireframes to structure the layout and visualise the flow of different pages. Each page was individually styled after implementing the functionality, with a strong focus on responsiveness.

The project was completed using a combination of pair programming and individual work with close collaboration for identifying and solving bugs. New features were developed on a new branch and merged into main with approval from another team member. This, along with Vercel checks after every merge request helped to avoid bugs in main. Conventional commits were also used for consistency and readability.
