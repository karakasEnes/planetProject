const fs = require('fs');
const { parse } = require('csv-parse');

const results = [];

function isHabitable(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

fs.createReadStream('./keplerData.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitable(data)) {
      results.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(results.map((planet) => planet['kepler_name']));
    console.log(`${results.length} total planets found!`);
  });
