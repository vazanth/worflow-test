import http from 'http';
// import path from 'path';
import 'dotenv/config';
import app from './app';
import { mongoConnect, mongoDisconnect } from './services/mongo';
import { loadPlanetsData } from './models/planet.model';
import { loadLaunchData } from './models/launches.model';
// dotenv.config({ path: path.join(__dirname, '..', '.env') });
// console.log('__dirname', path.join(__dirname, '..', '.env'));

const PORT = process.env.PORT;

const server = http.createServer(app);

async function startServer() {
  mongoConnect();
  loadPlanetsData();
  loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

process.on('SIGTERM', (signal) => {
  console.log(`Received ${signal}`);
  mongoDisconnect();
  process.exit(0);
});

// Handle ^C
process.on('SIGINT', async (signal) => {
  console.log(`Received ${signal}`);
  mongoDisconnect();
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception');
  console.error(err);
  mongoDisconnect();
  process.exit(1);
});
