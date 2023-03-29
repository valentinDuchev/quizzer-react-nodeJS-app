const cors = require('cors');

const allowedOrigins = ['http://localhost:4200',
    'http://127.0.0.1:5500'];



const corsOptions = {

    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) { 
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },

    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

    credentials: true,
};
module.exports = cors(corsOptions);