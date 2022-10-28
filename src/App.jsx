import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import "./api/axiosDefaults";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import RegistrationForm from "./pages/auth/RegistrationForm";
import SignInForm from "./pages/auth/SignInForm";
import PropertyForm from "./pages/property/PropertyForm";
import PropertyListPage from "./pages/property/PropertyListPage";
import PropertyPage from "./pages/property/PropertyPage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <PropertyListPage />} />
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
          <Route
            exact
            path="/404"
            render={() => <p>Page Not Found Placeholder (404)</p>}
          />
          <Route render={() => <p>Page Not Found Placeholder</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
