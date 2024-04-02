import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api/index";
import Breadcrumbs from "./Breadcrumbs";
import CardForm from "./CardForm";

function EditCard() {
    const [deckName, setDeckName] = useState("");
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const { deckId, cardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId)
            .then(async (data) => {
                setDeckName(data.name);

                const card = await readCard(cardId);
                const { back, front } = card;
                setFront(front);
                setBack(back);
            })
            .catch((error) => console.log(error));
        return () => abortController.abort();
    }, [deckId, cardId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        const signal = abortController.signal;

        await updateCard(
            { id: cardId, front, back, deckId: parseInt(deckId) },
            signal
        );

        navigate(-1);
    };

    const handleCancel = () => {
        navigate.goBack();
    };

    return (
        <div>
            <Breadcrumbs crumbs={[deckName, `Edit Card ${cardId}`]} />
            <h2>Edit Card</h2>
            <CardForm
                handleSubmit={handleSubmit}
                handleExit={handleCancel}
                front={front}
                setFront={setFront}
                back={back}
                setBack={setBack}
                buttonTextOne={"Cancel"}
                buttonTextTwo={"Submit"}
            />
        </div>
    );
};

export default EditCard;