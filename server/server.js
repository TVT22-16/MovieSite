const express = require('express')
const app = express()

app.get('/test', (req, res) => {
    const jsonObjectArray = [
        { user: 'Testipete' },
        { user: 'Testijaska' },
        // Add more objects as needed
    ];

    res.json(jsonObjectArray);
});

app.listen(5000,() => {console.log("Server started on port 5000")})

