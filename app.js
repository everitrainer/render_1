import express from 'express';
import db from './models/index.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

app.use(express.json());
// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'A simple Express API',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['*.js'], // files containing annotations for the Swagger docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Use swagger-ui-express for your app documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Get all games
/**
 * @swagger
 * /games:
 *   get:
 *     summary: Returns a array of games
 *     responses:
 *       200:
 *         description: It gets me the games
 */
app.get('/games', async (req, res) => {
    try {
        const games = await db.Game.findAll();
        res.json(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a specific game by ID
app.get('/games/:id', async (req, res) => {
    try {
        const game = await db.Game.findByPk(req.params.id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new game
app.post('/games', async (req, res) => {
    try {
        const { name, genre } = req.body;
        const game = await db.Game.create({ name, genre });
        res.status(201).json(game);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a game by ID
app.put('/games/:id', async (req, res) => {
    try {
        const { name, genre } = req.body;
        const game = await db.Game.findByPk(req.params.id);
        if (game) {
            game.name = name;
            game.genre = genre;
            await game.save();
            res.status(200).json(game);
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a game by ID
app.delete('/games/:id', async (req, res) => {
    try {
        const game = await db.Game.findByPk(req.params.id);
        if (game) {
            await game.destroy();
            res.status(200).send('Game deleted');
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
