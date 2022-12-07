import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
