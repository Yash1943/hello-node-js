// Required modules
const fs = require('fs');
const readline = require('readline');

// Global variables
const teams = [];
const schedule = [];

// Read in team names from file
const teamNamesFile = 'team_names.txt';
const readInterface = readline.createInterface({
  input: fs.createReadStream(teamNamesFile),
  output: process.stdout,
  console: false
});

readInterface.on('line', function(line) {
  teams.push(line);
});

readInterface.on('close', function() {
  // Create schedule
  const numTeams = teams.length;
  for (let i = 0; i < numTeams - 1; i++) {
    for (let j = i + 1; j < numTeams; j++) {
      schedule.push([teams[i], teams[j]]);
    }
  }

  // Output schedule
  console.log(`Sports schedule:\n${schedule.join('\n')}`);
});
