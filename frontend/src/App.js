import './App.css';
import AddUrlComponent from "./components/AddUrlComponent";
import ViewUrlComponent from "./components/ViewUrlComponent";

function App() {
  return (
    <div className="App container mt-5">
      <div className="container1">
        <AddUrlComponent />
      </div>
      <div className="container1">
        <ViewUrlComponent />
      </div>
    </div>
  );
}

export default App;
