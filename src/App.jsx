import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import "./api/axiosDefaults";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import RegistrationForm from "./pages/auth/RegistrationForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import PropertyForm from "./pages/property/PropertyForm";
import PropertyListPage from "./pages/property/PropertyListPage";
import PropertyPage from "./pages/property/PropertyPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PropertyListPage message="No results found, please try adjusting your search postcode, radius and/or filters." />
            )}
          />
          <Route
            exact
            path="/bookmarks"
            render={() => (
              <PropertyListPage
                message="No results found, any properties you bookmark will be listed here."
                filter={`bookmarked_properties_for_profile=${profile_id}`}
              />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PropertyListPage
                message="No results found, any properties from sellers you follow will be listed here."
                filter={`property_feed_for_profile=${profile_id}`}
              />
            )}
          />
          <Route exact path="/login" render={() => <SignInForm />} />
          <Route exact path="/register" render={() => <RegistrationForm />} />
          <Route
            exact
            path="/property/create"
            render={() => <PropertyForm />}
          />
          <Route exact path="/property/:id/" render={() => <PropertyPage />} />
          <Route
            exact
            path="/property/:id/edit"
            render={() => <PropertyForm />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route exact path="/404" render={() => <NotFound />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
