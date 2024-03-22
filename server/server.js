const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["Nojus", "Tomas", "Vytenis"] })
})


app.listen(5000, () => {console.log("Server started on port 5000")})