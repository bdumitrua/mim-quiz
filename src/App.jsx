import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Head from "./components/Head";
import QuizBody from "./components/QuizBody";
import Result from "./components/Result";

import ScrollToHash from "./hooks/ScrollToHash";

function App() {
    return (
        <BrowserRouter>
            <ScrollToHash />
            <div className="container">
                <Head />
                <Routes>
                    <Route path="/" element={<QuizBody />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
