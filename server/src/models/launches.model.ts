import axios from 'axios';
import launches from './launches.mongo';
import planets from './planets.mongo';

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target?: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

const saveLaunches = async (launch: Launch) => {
  try {
    await launches.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(`Unabled to save launches ${error}`);
  }
};

const populateLaunches = async () => {
  console.log('Launches data are being loaded......');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log('Problem downloading launch data');
    throw new Error('Launch data download failed');
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload: any) => {
      return payload['customers'];
    });
    const launch: Launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    // console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunches(launch);
  }
};

const loadLaunchData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
    await populateLaunches();
  }
};

const findLaunch = async (filter: any) => {
  return await launches.findOne(filter);
};

const launchExists = async (id: number) => {
  return await findLaunch({ flightNumber: id });
};

const getAllLaunches = async (skip: number, limit: number) => {
  return await launches
    .find({}, '-__v -_id')
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launches.findOne({}).sort('-flightNumber');
  console.log('latestLaunch', latestLaunch);
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber + 1;
};

const scheduleNewLaunch = async (launch: Launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet found');
  }

  const flightNumber = await getLatestFlightNumber();
  const newLaunch: Launch = Object.assign(launch, {
    flightNumber,
    customers: ['ISRO', 'NASA'],
    upcoming: true,
    success: true,
  });
  await saveLaunches(newLaunch);
};

const abortLaunchById = async (id: number) => {
  const aborted = await launches.updateOne(
    { flightNumber: id },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.ok === 1 && aborted.nModified === 1;
};

export {
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  launchExists,
  abortLaunchById,
};
