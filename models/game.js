const GameModel = (sequelize, DataTypes) => {
    const Game = sequelize.define('Games', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Game;
};


export default GameModel;

