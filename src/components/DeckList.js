import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import Deck from "./Deck";

function DeckList() {
    const [decks, setDecks] = useState([]);
    const { deckId } = useParams();
    const navigate = useNavigate();

    const handleDelete = (deckId) => {
        const message = "Are you sure you want to delete?";
        const deleteDeckPrompt = window.confirm(message);

        if (deleteDeckPrompt) {
            deleteDeck(deckId) && window.location.reload();
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        listDecks(deckId, signal)
            .then(setDecks)
            .catch((error) => console.log(error));

        return controller.abort();
    }, [deckId, setDecks]);

    const listOfDecks = decks.map((deck) => {
        return <Deck key={deck.id} deck={deck} handleDelete={handleDelete} />;
    });

    return (
        <div>
            <Link to="/decks/new">
                <button type="button" className="btn btn-secondary btn mb-2">
                    + Create Deck
                </button>
            </Link>
            <div>{listOfDecks}</div>
        </div>
    );
};

export default DeckList;