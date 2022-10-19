import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import styles from "./App.module.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page Placeholder</h1>} />
          <Route
            exact
            path="/signin"
            render={() => <h1>Sign In Page Placeholder</h1>}
          />
          <Route
            exact
            path="/signup"
            render={() => <h1>Sign Up Page Placeholder</h1>}
          />
          <Route render={() => <p>Page Not Found Placeholder</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
