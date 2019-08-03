This project was made with [Create React App](https://github.com/facebook/create-react-app).

## Task: 
- To realize the App, with the interface for listing, sorting
the posts, taken from the Api: "https://bloggy-api.herokuapp.com/posts";
Will receive the Array of the Objects with keys: id, title, body;
- New and updated Posts should be defaultly updated with new
properties: creationDate, comments;
- To realize the methods for creation, update, delete actions 
for the posts and comments;
- Each action with the post or its comments should be Posted to
the API for changing state and retrieving new state of the data;
- The state of the App should be synchronized with the API state
when POSTing new data to the API; POST new data - retrieve the 
updated data from the API - rendering APP with the new App State;
    
### Pages: 
- MainPage: will fetch the data from the API on componentDidMount,
then render the list of the fetched posts;
    - Main Page UI has sorting of the posts by title and creation date(by default);
    - if the Post, doesn`t have the date, then to sort it as
    with the latest date; Also the creationDate will be added by
    default when updating the Post; 
    - new and updated Posts auto receives the 'creationDate'
    property; 
    - each Post in the list of MainPage should have the restriction in
    letters (in the body); If the Post body length > 200 letters,
    then to cut the body and to tale with ...;
    - each Post fires on click, then pushing history to the PostPage
    with the particular id;
        
- PostPage renders the exact Post with the properties:
    - PostPage takes 'pathMatch.params' from the url and looks for the same id
    in the state of the posts;
    if the Posts State doesn`t find the id, taken from 'pathMatch.params',
    then to puth the history to the Main Page;
    - PostPage has the Navlink to the MainPage with the list of all posts;
    - PostPage has delete, save and undo interfaces;
      - When the Post is deleted, then to fetch DEL to the API, 
      then to retrieve the updated data with rendering new list of the posts,
      then to push the history to MainPage with the updated list of the posts;
      - When the Post is updated with the 'save' button, then to
      create the save of the current State and to fetch UPDATE to the API
      with the updated post by id; Then to retrieve and re-render the
      current Post;
      - When the Post is updated and later fired on 'Redo' button,
      then to update the Post with the prevState properties, then
      to fetch UPDATE of the post to the API with refreshing and re-rendering;
    - PostPage adds option for creating/updating/deleting 'comments';
      The comments property is to be added to the Post keys;
      - The list of comments is to be rendered under the Post body text;
      - Each comments` item can be updated, deleted, created;
      The final "save" action will PUT the API with the updated Post;
      - If the 'save' action is fired, but no change of the Post, then
      to ignore the action; If no changes of Post, then to inactivate
      the 'save' button;
/////////////////////////////////////////////////////////////////


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
