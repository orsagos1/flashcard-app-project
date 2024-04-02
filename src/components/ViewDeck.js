import React, { useEffect, useState } from "react";
import { deleteDeck, readDeck } from "../utils/api/index";
import { useNavigate, useParams, Link } from "react-router-dom";
import Card from "./Card";
import BreadCrumbs from "./Breadcrumbs";


 // View deck screen is displayed at '/decks/:deckId'
 // Displays all of the info about a deck & cards
 // Includes 'Edit', 'Study', 'Add Cards' & 'Delete' btns

const ViewDeck = () => {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({ id: "", name: "", description: "" });
  const { id, name, description } = deck;

  const { deckId } = useParams();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const response = window.confirm("Are you sure you want to delete?");
    if (response) {
      deleteDeck(deckId);
      navigate("/");
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId)
      .then(setDeck)
      .catch((error) => console.log(error));

    return abortController.abort();
  }, [deckId, setDeck]);

  useEffect(() => {
    const abortController = new AbortController();

    if (deck.cards) {
      setCards(deck.cards);
    }

    return abortController.abort();
  }, [deckId, setCards, deck]);

  return (
    <div className="mb-2">
      <BreadCrumbs crumbs={[name]} />
      <h3>{name}</h3>
      <p>{description}</p>
      <Link to={`/decks/${deckId}/edit`}>
        <button className="btn btn-secondary mr-2">Edit</button>
      </Link>
      <Link to={`/decks/${deckId}/study`}>
        <button className="btn btn-secondary mr-2">Study</button>
      </Link>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-secondary mr-2">Add Cards</button>
      </Link>
      <button
        className="btn btn-danger float-right margin-bottom"
        onClick={(e) => {
          e.preventDefault();
          handleDelete(id);
        }}
      >
        Delete
      </button>
      <br />
      <br />
      <h4>Cards</h4>
      <ul className="list-group">
        {cards.length &&
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              deckId={deckId}
              handleDelete={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
};

export default ViewDeck;