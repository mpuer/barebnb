import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ListingViewer from "./components/Listings";
import OneListing from "./components/OneListing";
import SplashPage from "./components/SplashHomePage";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";

function App() {
  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            {sessionUser ? <ListingViewer/> : <SplashPage/> }
          <Footer/>
          </Route>
          <Route path="/listings/:id">
            {sessionUser ? <OneListing/> : <Redirect to="/"/>}
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
