import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TestChild } from "./components/testChild";
import { Tester } from "./components/tester";

function App() {
  return (
    <Tester>
      <TestChild></TestChild>
    </Tester>
  );
}

export default App;
