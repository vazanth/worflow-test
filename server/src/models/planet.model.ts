import parse from 'csv-parse';
import fs from 'fs';
import path from 'path';

import planets from './planets.mongo';

function isHabitablePlanet(planet: any) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const planetsFound = (await getAllPlanets()).length;
        console.log(`${planetsFound} habitable planets found!`);
        resolve('');
      });
  });
};

const getAllPlanets = async () => {
  return await planets.find({}, '-__v -_id');
};

const savePlanet = async (planet: any) => {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error: any) {
    console.log(`Could not save planet ${error}`);
  }
};

export { getAllPlanets, loadPlanetsData };
