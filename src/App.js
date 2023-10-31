import React, { useState } from "react";
import "./App.css";
import { useQuery } from "react-query";

function Button() {
  const { data, error } = useQuery("hello-world", () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(1337), 1000);
    });
  });

  return <button>I am a button</button>;
}

function App() {
  const [visible, setVisible] = useState(true);

  function toggleButton() {
    setVisible((visible) => !visible);
  }

  return (
    <div className="App">
      {visible && <Button />}
      <button onClick={toggleButton}>Toggle</button>
    </div>
  );
}

export default App;
