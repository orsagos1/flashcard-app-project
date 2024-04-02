import React, { useState, useEffect} from "react"
import { listDecks, deleteDeck} from "../utils/api/index"
import { Link, useNavigate} from "react-router-dom";

function Home () {
    const [decks, setDecks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController()
            try{
                const response = await listDecks(abortController.signal)
                setDecks(response)
            }catch (error){
                console.log("Something Broke", error)

            }
            return () => {
                abortController.abort()
            }
        }
        fetchData()
    }, [])

    async function deleteHandler(deck) {
        if( window.confirm("Delete this deck? You will not be able to recover from it")){
            navigate("/")
            return await deleteDeck(deck.id)
        }
    }

    return (
        <div name="container">
            <div className="my-2">
            <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
            </div>
            <div className="card-deck">
                <div>
                {decks.map((deck) => {
                    return (
                        <div className="card" key={deck.id}>
                            <div className="card-body">
                                <div className="card-subtitle float-right"> {deck.cards.length} cards</div>
                                <div>
                                    <h5 className="card-title">{deck.name}</h5>

                                </div>

                                <div className="card-text"> {deck.description}</div>
                                <div className="my-2">
                                    <Link to={`decks/${deck.id}`}><button className="btn btn-secondary">View</button></Link>
                                    <Link to={`decks/${deck.id}/study`}><button className="btn btn-primary mx-1">Study</button></Link>
                                    <button onClick={() => deleteHandler(deck)}className="btn btn-danger float-right">Delete</button>
                                </div>
                            </div>
                        </div>
                    )

                })}
                </div>
            </div>
        </div>
    )
}

export default Home;