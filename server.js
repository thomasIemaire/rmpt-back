const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

global.__basedir = __dirname;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require('./app/routes/authentification.route');
const userRouter = require('./app/routes/user.route');

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to RM Poker Tour's API!" });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/authentification/', authRouter);
app.use('/api/users/', userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});

const sequelize = require('./app/models/conf.model');
const RmptEarningsFormat = require('./app/models/RmptEarningsFormat.model');
const RmptMoreUsers = require('./app/models/RmptMoreUsers.model');
const RmptPlayed = require('./app/models/RmptPlayed.model');
const RmptPointsFormat = require('./app/models/RmptPointsFormat.model');
const RmptResultsTournaments = require('./app/models/RmptResultsTournaments.model');
const RmptSeasons = require('./app/models/RmptSeasons.model');
const RmptStatusRights = require('./app/models/RmptStatusRights.model');
const RmptTournaments = require('./app/models/RmptTournaments.model');
const RmptUserRights = require('./app/models/RmptUserRights.model');
const RmptUsers = require('./app/models/RmptUsers.model');
const RmptUserStatus = require('./app/models/RmptUserStatus.model');

RmptUsers.belongsTo(RmptUserStatus, { foreignKey: 'status' });
RmptMoreUsers.belongsTo(RmptUsers, { foreignKey: 'user' });
RmptTournaments.belongsTo(RmptUsers, { foreignKey: 'host' });
RmptTournaments.belongsTo(RmptSeasons, { foreignKey: 'season' });
RmptResultsTournaments.belongsTo(RmptTournaments, { foreignKey: 'tournament' });
RmptPlayed.belongsTo(RmptUsers, { foreignKey: 'user' });
RmptPlayed.belongsTo(RmptTournaments, { foreignKey: 'tournament' });
RmptPlayed.belongsTo(RmptUsers, { foreignKey: 'killer', as: 'Killer' });
RmptStatusRights.belongsTo(RmptUserStatus, { foreignKey: 'status' });
RmptStatusRights.belongsTo(RmptUserRights, { foreignKey: 'right' });

RmptUsers.hasOne(RmptMoreUsers, { foreignKey: 'user' });

(async () => {
  try {
    await sequelize.sync();
    console.log('Base de données synchronisée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  }
})();
