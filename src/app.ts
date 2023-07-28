import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from "./database/models";
import SequelizeConnection from "./database/SequelizeConnection";
import { AuthMiddleware } from "./middleware/AuthMIddleware";

import authRoutes from './routes/AuthRoutes';
import locationRoutes from './routes/LocationRoutes';
import cameraRoutes from './routes/CameraRoutes';
import ipFolderRoutes from './routes/IpFolderRoutes';

import { CameraHandler } from "./handler/camera-handler";

const APP_CORS = <string>process.env.APP_CORS;
const app = express();

(async () => {
  await SequelizeConnection.connect();

  // once connection is authenticated, sequelize will sync the database models
  // force flag is used to drop the database and create the database again
  db.sequelize.sync({
    force: false
  })

})();

CameraHandler.listenToFolderChanges();

const server = app.listen(8000, () => {
  console.log(`⚡️[server]: running at http://localhost:${8000}`);
});


process.on('SIGINT', () => {
  SequelizeConnection.close();
  process.exit();
});

app.use(cors({
  origin: APP_CORS
}));

app.use(bodyParser.json());
app.use(AuthMiddleware.handleToken);

app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/folder', ipFolderRoutes);
app.use('/api/camera', cameraRoutes);

export default server;