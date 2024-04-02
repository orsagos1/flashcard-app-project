import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { createDeck } from "../utils/api/index";
import Breadcrumbs from "./Breadcrumbs";

// Create deck screen at "/decks/new"
// The home screen has a "create deck" button

function CreateDeck() {
    const [values, handleChange] = useForm({ name: "", description: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        const signal = abortController.signal;

        const newDeck = await createDeck(values, signal);
        console.log({here: "here"});
        navigate(`/decks/${newDeck.id}`);
    };

    const handleCancel = () => {
        navigate.goBack();
    };

    return (
        <div>
            <Breadcrumbs crumbs={["Create Deck"]} />
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder={"Enter Deck Name"}
                        onChange={handleChange}
                        required
                    />
                    <label className="mx-1 my-1">Description</label>
                    <textarea 
                        className="form-control"
                        name="description"
                        value={values.description}
                        placeholder={"Brief Description of the deck"}
                        type="textarea"
                        onChange={handleChange}
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

export default CreateDeck;