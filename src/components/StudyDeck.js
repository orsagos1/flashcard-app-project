import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Breadcrumbs from "./Breadcrumbs";

function StudyDeck() {
    const [deck, setDeck] = useState({ name: "", cards: [] });
    const [selectedCard, setSelectedCard] = useState({ front: "", back: "" });
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId)
            .then(setDeck)
            .catch((error) => console.log(error));

        return abortController.abort();
    }, [deckId, setDeck]);

    useEffect(() => {
        if (deck.cards.length > 0) {
            setSelectedCard(deck.cards[selectedIndex]);
        }
    }, [deck, selectedIndex]);

    if (deck.cards.length <= 2) {
        return (
            <div>
                <Breadcrumbs crumbs={[deck.name, "Study"]} />
                <h2>{deck.name} : Study</h2>
                <h4>Not enough cards</h4>
                <p>
                    You need at least 3 cards to study. There are {deck.cards.length}{" "} cards in this deck.
                </p>
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button className="btn btn-primary mr-2">+ add cards</button>
                </Link>
            </div>
        );
    }

    const frontCard = (
        <div className="card-body">
            <h5 className="card-title">
                card {selectedIndex + 1} of {deck.cards.length}
            </h5>
            <p className="card-text">{selectedCard.front}</p>
            <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={(e) => {
                    setIsFlipped(true);
                }}
            >
                Flip
            </button>
        </div>
    );

    const backCard = (
        <div className="card-body">
            <h5 className="card-title">
                card {selectedIndex + 1} of {deck.cards.length}
            </h5>
            <p className="card-text">{selectedCard.back}</p>
            <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={(e) => {
                    if (selectedIndex + 1 !== deck.cards.length) {
                        setSelectedIndex(selectedIndex + 1);
                        setSelectedCard(deck.cards[selectedIndex + 1]);
                        setIsFlipped(false);
                    } else {
                        let response = window.confirm(
                            "Restart cards? \n Click 'cancel' to return to the home page."
                        );
                        if (response) {
                            setSelectedIndex(0);
                            setIsFlipped(false);
                        } else {
                            navigate("/");
                        }
                    }
                }}
            >
                Next
            </button>
        </div>
    );

    return (
        <>
            <Breadcrumbs crumbs={[deck.name, "Study"]} />
            <h2>Study: {deck.name}</h2>
            <div className="card w-60">{isFlipped ? backCard : frontCard}</div>
        </>
    );
};

export default StudyDeck;