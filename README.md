# "POST IT" App  
 The React App **POST IT** demonstrates the posts and the comments of the registered users.
 
 For the users and posts` example data the following API is taken: 
 [https://dummyjson.com](https://dummyjson.com)  
 In order to create Your own posts or delete own posts You have to log in under one of the registered users.  
 For convenience the login and password of one of the users are shown at login page.  
 When You are logged in, the profile page is also achievable and can be updated.  
 
## Task: 
- the API does not really saves, updates or delete the messages, users or comments;
- To implement "react-router-dom" for the pages navigation;
- To implement "react-redux", "redux toolkit" for the App state management;
- To implement "redux-saga" for the dispatched actions handling, avoiding thunk;
- To realise Alert messaging on loading, changing, saving, error;
- The shown list of the posts can be sorted by Author, by Raiting (the number of stars), by the title of the post 
and by creation time;
- The shown list of the posts can also be filtered by the logged user; 
If the user is logged in, he can add or delete the posts;
- To fetch the posts, users and comments to the localforage for the future turns;
- As each User can have a lot of data, the optimal way of fetching all the users should be only for several critical
 information which is used in UI: id, image, firstName, lastName.  
 For the Profile Page of the logged user it is necessary to make a separate request for all the data, which is used 
 for this page, then to store it in the localforage for the future turns.
 - To realize authorization of the user when logging in with the future renewal of JWT token;  
 As the API does not supply the refresh token, to renew the access token at the end of the validation period;
 - As the API does not save the updated user`s data, then to temporally save the updated profile data to localforage;
______________________

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).