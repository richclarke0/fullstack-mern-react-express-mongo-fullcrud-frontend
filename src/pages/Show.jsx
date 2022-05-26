import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function Show(props) {
    const { id } = useParams()
    const people = props.people
    const person = people.find((p) => p._id === id)
    let navigate = useNavigate()


    // state for form
    const [editForm, setEditForm] = useState(person)

    // handleChange function for form
    const handleChange = (event) => {
        setEditForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    // handlesubmit for form
    const handleSubmit = (event) => {
        event.preventDefault()
        props.updatePeople(editForm, person._id)
        // redirect people back to index
        navigate("/")
    }

    return (
        <div className="person">
            <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input type="submit" value="Update Person" />
            </form>
        </div>
    )
}
