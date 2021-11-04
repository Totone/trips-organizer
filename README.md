# Trips Organizer

## Summary

Web Application whose goal is to allow to retrieve the list of available trips from a given bus stop & book the interesting ones.

### Setup

You need [Node.JS](https://nodejs.org/en/) installed to be able to setup the project.  

1. Download or clone the repository
2. Install dependencies with `npm install` command
3. Create `.env` file & fill its content using `.env.sample` to set the right environment variables
4. Project is ready

### Online version

Project is available online, [click here to go there](https://totone.github.io/trips-organizer)

## Getting started

Project bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Stack

- UI: React with Typescript support
- State container: [Redux](https://redux.js.org/)
- Components library: [Bootstrap](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/)
- Tests: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- XHR Requests handler: [axios](https://github.com/axios/axios)
- Locales handler & Internationalization: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Notes (role play off)

I tried to be as efficient as possible, but since I couldn't free much time to perform this test I had to do some compromises. So in order to finish it quickly I didn't implement all tests, avoiding the ones for UI components.

I let `.env` to the project istead of adding it to `.gitignore` & use `.env.sample`.

I used Redux instead of contexts & hook to handle the app state as it's a part of your stack & did the same for Bootstrap.

Mandatory features are:

- Fetch the list of all bus stops
- Fetch the list of available trips depending on the departure bus stop
- Book a bus stop

I added some features in order to have a more efficient application:

- Requested trips are cached
  - Limits API calls when an request has already been done
  - Increases application speed when an already fetched list is requested again
  - You can reset the cache & request the API for the last updates
- You can sort the received trips list
  - 2 ways: sort by departure time or sort by bus stop name
- You can fetch the list of all available trips, not depending on a bus stop
  - All trips are cached
- There is a list of your booked trips
  - A trip can be booked only once
- You can cancel a book for a trip
  - As there was not an endpoint to do this:
    - I assumed the url was the same as book with the trip id, with `delete` HTTP method instead of `put`
    - I emulated API behaviour using `setTimeout` & didn' implement tests for this API method
- I used an internationalization module to be able to add languages supports to the web app
