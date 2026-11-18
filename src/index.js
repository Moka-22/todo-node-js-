require('dotenv').config();

const express = require('express');
// ده اللى هضيف فيه ال routes بتاعتى و ال middlewares بتاعتى
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.Port;
const cors = require('cors');



const todosRoutes = require('./routes/todos');


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


// logger middleware عشان اعمل log لكل request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}
)

// middlewares بستخدمها قبل ال routes
// app.use عشان استخدم ال middlewares
app.use(express.json()); // عشان اقدر استقبل json data من ال request body
app.use(cors()); // عشان ال front-end يقدر يعمل request لل back-end من domain مختلف

app.use('/api',todosRoutes); // عشان استخدم ال routes بتاعتى


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

