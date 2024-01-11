import logo from "./logo.svg";
import "./App.scss";
import { Router } from "./routes/Router";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home.jsx";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
