const http = require('http');

const googleTrends = require('google-trends-api');
const ObjectsToCsv = require('node-create-csv');

const hostname = '127.0.0.1';
const port = 3000;

const keyword = 'bitcoin';
const yearFrom = 2015;
const yearTo = new Date().getFullYear();

var resultsObj;
var csvData;

const createFile = async (fileName) => {
  const csvOutput = new ObjectsToCsv(csvData);
  
  csvString = await csvOutput.toString();

  await csvOutput.toDisk(fileName, { showHeader: true, append: false });
};

const pushElements = () => {
  for (var obj of resultsObj.default.timelineData) 
  {
    csvData.push({ time: obj.formattedTime, value: obj.formattedValue[0] })
  }
};

const queryTrends = async (from, to) => {
  await googleTrends.interestOverTime({
    keyword: keyword,
    startTime: from,
    endTime: to,
  }, async function(err, results) {
    if (err) console.log('Error', err);
    else {
      resultsObj = JSON.parse(results);
    } 
  });
};

const server = http.createServer(async (req, res) => {
  console.log("Initializing process...");

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  let queryYear;

  console.log("Querying DAILY trends:");

  csvData = [];
  queryYear = yearFrom;
  while (queryYear <= yearTo) {
    console.log(`Year ${queryYear}`);

    await queryTrends(new Date(`${queryYear}-01-01`), new Date(`${queryYear}-06-30`));
    pushElements();
    await queryTrends(new Date(`${queryYear}-07-01`), new Date(`${queryYear}-12-31`));
    pushElements();

    queryYear++;
  }
  await createFile(`./${keyword}-daily.csv`);

  console.log("Querying WEEKLY trends:");
  
  csvData = [];
  queryYear = yearFrom;
  while (queryYear <= yearTo) {
    console.log(`Year ${queryYear}`);

    await queryTrends(new Date(`${queryYear}-01-01`), new Date(`${queryYear}-12-31`));
    pushElements();

    queryYear++;
  }
  await createFile(`./${keyword}-weekly.csv`);  

  res.end('<h1>Files created:</h1>' +
    '<ul>' +
      '<li>bitcoin-weekly.csv</li>' +
      '<li>bitcoin-daily.csv</li>' +
    '</ul>');

  console.log("Process finished!");  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
