import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import "./api/axiosDefaults";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import RegistrationForm from "./pages/auth/RegistrationForm";
import SignInForm from "./pages/auth/SignInForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page Placeholder</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <RegistrationForm />} />
          <Route render={() => <p>Page Not Found Placeholder</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
