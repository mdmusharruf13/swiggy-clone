import "./App.css";

function App() {
  return (
    <>
      <h1>swiggy clone app</h1>
      <p>{import.meta.env.VITE_NAME}</p>
      <p>{JSON.parse(import.meta.env.VITE_DATA).NAME}</p>
    </>
  );
}

export default App;
