import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error loading deck", error);
      }
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  // Function to handle deck deletion
  const handleDeleteDeck = async () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      try {
        await deleteDeck(deckId);
        // Redirect user after deletion
        navigate("/");
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  // Function to handle card deletion
  const handleDeleteCard = async (cardId) => {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      await deleteCard(cardId, new AbortController().signal);
      setDeck({
        ...deck,
        cards: deck.cards.filter((card) => card.id !== cardId),
      });
    }
  };

  if (!deck.id) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      {/* Deck information */}
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      {/* Action buttons */}
      <div className="mb-4">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
          <span className="oi oi-pencil"></span> {/* For Edit button */}
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
          <span className="oi oi-book"></span> {/* For Study button */}
          Study
        </Link>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary mr-2"
        >
          <span className="oi oi-plus"></span> {/* For Add Cards button */}
          Add Cards
        </Link>
        <button
          onClick={handleDeleteDeck}
          className="btn btn-danger float-right"
        >
          <span className="oi oi-trash"></span> {/* For Delete button */}
        </button>
      </div>

      {/* List of cards */}
      <h1>Cards</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          {deck.cards &&
            deck.cards.map((card) => (
              <li key={card.id} className="list-group-item p-1">
                {/* Card content */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="card-text text-muted">{card.front}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-text text-muted">{card.back}</p>
                      <div className="float-right">
                        <Link
                          to={`/decks/${deckId}/cards/${card.id}/edit`}
                          className="btn btn-secondary mr-2"
                        >
                          <span className="oi oi-pencil"></span>{" "}
                          {/* For Edit button */}
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <span className="oi oi-trash"></span>{" "}
                          {/* For Delete button */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Deck;