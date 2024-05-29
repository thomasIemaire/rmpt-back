const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

global.__basedir = __dirname;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require('./app/routes/authentification.route');
const tournamentRouter = require('./app/routes/tournament.route');
const userRouter = require('./app/routes/user.route');
const seasonRouter = require('./app/routes/season.route');

app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to RM Poker Tour's API!" });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/authentification/', authRouter);
app.use('/api/tournaments/', tournamentRouter)
app.use('/api/users/', userRouter);
app.use('/api/seasons/', seasonRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}/`);
});

const sequelize = require('./app/models/conf.model');
const RmptSeasons = require('./app/models/RmptSeasons.model');
const RmptStatus = require('./app/models/RmptStatus.model');
const RmptTournaments = require('./app/models/RmptTournaments.model');
const RmptUsers = require('./app/models/RmptUsers.model');
const RmptPlays = require('./app/models/RmptPlays.model');

RmptUsers.belongsTo(RmptStatus, { foreignKey: 'fkstatus', as: 'status' });

RmptTournaments.belongsTo(RmptUsers, { foreignKey: 'fkhost', as: 'host' });
RmptTournaments.belongsTo(RmptSeasons, { foreignKey: 'fkseason', as: 'season' });

RmptPlays.belongsTo(RmptTournaments, { foreignKey: 'fktournament', as: 'tournament' });
RmptPlays.belongsTo(RmptUsers, { foreignKey: 'fkuser', as: 'user' });
RmptPlays.belongsTo(RmptUsers, { foreignKey: 'fkkiller', as: 'killer' });


(async () => {
  try {
    await sequelize.sync();
    console.log('Base de données synchronisée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  }
})();
