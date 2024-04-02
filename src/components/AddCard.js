import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import Breadcrumbs from "./Breadcrumbs";
import CardForm from "./CardForm";

// Add card screen is displayed at "/decks/:deckId/cards/new"
// Allows user to add new card to existing deck
// Shares same form component with Edit Card screen

function AddCard() {
    const [deck, setDeck] = useState({ name: "" });
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId)
            .then(setDeck)
            .catch((error) => console.log(error));

        return abortController.abort();
    }, [deckId, setDeck]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        const signal = abortController.signal;

        await createCard(deckId, { front, back }, signal);
        setFront("");
        setBack("");
    };

    const handleDone = () => {
        navigate(-1);
    };

    return (
        <div>
            <Breadcrumbs crumbs={[deck.name, "Add Card"]} />
            <h2>{deck.name}: Add Card</h2>
            <CardForm
                handleSubmit={handleSubmit}
                handleExit={handleDone}
                front={front}
                setFront={setFront}
                back={back}
                setBack={setBack}
                buttonTextOne={"Done"}
                buttonTextTwo={"Save"}
            />
        </div>
    );
}

export default AddCard;