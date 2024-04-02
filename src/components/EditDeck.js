import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import Breadcrumbs from "./Breadcrumbs";

function EditDeck() {
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");

    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId)
            .then((data) => {
                setDeckName(data.name);
                setDeckDescription(data.description);
            })
            .catch((error) => console.log(error));

        return abortController.abort();
    }, [deckId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        const signal = abortController.signal;

        const response = await updateDeck(
            { id: deckId, name: deckName, description: deckDescription },
            signal 
        );
        navigate(`/decks/${response.id}`);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <Breadcrumbs crumbs={[deckName, "Edit Deck"]} />
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="name"
                        value={deckName}
                        placeholder={"Enter Deck Name"}
                        onChange={(e) => setDeckName(e.target.value)}
                        required
                    />
                    <label className="mx-1 my-1">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={deckDescription}
                        placeholder={"Brief Description of the deck"}
                        type="textarea"
                        onChange={(e) => setDeckDescription(e.target.value)}
                        required
                    />
                    <div className="buttons my-2">
                        <button
                            type="button"
                            className="btn btn-secondary mx-1"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditDeck;