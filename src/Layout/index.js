import React from "react";
import { Route, Routes } from "react-router-dom";
import AddCard from "../components/AddCard";
import CreateDeck from "../components/CreateDeck";
import EditCard from "../components/EditCard";
import EditDeck from "../components/EditDeck";
import StudyDeck from "../components/StudyDeck";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "../components/Deck"
import Home from "../components/Home"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/decks/new" element={<CreateDeck />} />
            <Route path="/decks/:deckId" element={<Deck/>} />
            <Route path="/decks/:deckId/edit" element={<EditDeck />} />
            <Route path="/decks/:deckId/study" element={<StudyDeck />} />
            <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </>
  );
}

export default Layout;
