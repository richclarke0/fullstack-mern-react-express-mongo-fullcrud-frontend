// import {Routes, Route} from "react-router-dom"
// import Index from "../pages/Index"
// import Show from "../pages/Show"

// export default function Main(props) {
//     return (
//     <main>
//       <Routes>
//         <Route exact path="/" element={<Index/>} />
//         <Route path="/people/:id" element={<Show/>} />
//       </Routes>
//     </main>
//       )
//   }
  
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

function Main(props) {

  const [people, setPeople] = useState(null)

  const URL = "https://blooming-oasis-55976.herokuapp.com/people"

  const getPeople = async () => {
    // const data = await fetch(URL).then(res => res.json)
    const response = await fetch(URL)
    const data = await response.json()
    setPeople(data)
  }

  const createPeople = async (person) => {
    // make post request to create people
    //this replaces methodoverride? something like that
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    // update list of people
    getPeople()
  }

  useEffect(() => {getPeople()}, [])

  return (
    <main>
      <Routes>
        <Route
          exact
          path="/"
          element={<Index people={people} createPeople={createPeople} />}
        />
        <Route path="/people/:id" element={<Show people={people} />} />
      </Routes>
    </main>
  )
}

export default Main
  