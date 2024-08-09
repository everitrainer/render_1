import db from '../models/index.js';

const setupDatabase = async () => {
    try {
        await db.sequelize.sync({ force: true });

        await db.Game.bulkCreate([
            { name: 'Cricket', genre: 'Sport' },
            { name: 'Chess', genre: 'Strategy' }
        ]);

        console.log('Database setup complete.');
    } catch (error) {
        console.error('Database setup error:', error);
    }
};

setupDatabase();
