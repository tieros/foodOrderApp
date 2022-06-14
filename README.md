# Responsive Food Order Web Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## You can find the deployed version here: [(http://food-order-app-taupe.vercel.app/)]

- React version 18
- React-Router DOM version 6
- Redux-Toolkit for state management
- State persistance with Redux Persist
- Firebase on the back-end
- Scss (with modules)
- Form validation is handled by custom hook

You can surf around the Yummy Hamburgers, but you need to be logged-in to order.

Once you sign-up, you can edit your profile information: 

![editprofile](https://user-images.githubusercontent.com/93452896/173610305-18d8fe7a-f888-4a5b-8668-df79b3f7af1d.jpg)

You can also arrange the amount of your items in your shopping cart: 

![cart](https://user-images.githubusercontent.com/93452896/173610458-ed24de2a-4f1b-477d-a119-2411b901fcd9.jpg)

If nothing goes wrong, you will see the "order successful" notification for 3 seconds:

![orderSuccess](https://user-images.githubusercontent.com/93452896/173610683-fbb699b9-d57e-4ef3-8287-95f59709fe79.jpg)

Firebase keeps cart items with user information attached. Here is the order you just gave: 

![orderdata](https://user-images.githubusercontent.com/93452896/173611080-70367672-9167-4f0d-b44e-bbf6d688eb30.jpg)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
