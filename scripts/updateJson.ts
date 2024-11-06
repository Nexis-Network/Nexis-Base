// Add new fields to every wallet in the JSON file

import fs from 'node:fs';

// Read the existing JSON data
const rawData = fs.readFileSync('data/nexis_holders_data.json', 'utf8');
const data = JSON.parse(rawData);

// Default values for the new fields
const defaultFields = {
  referral_code: "",
  referral_points: 0,
  staking_points: 0,
  on_chain_points: 0,
  social_points: 0,
  nodes_owned: 0,
  nodes_staked: 0,
  nzt_staked: 0,
  sold_nzt: "",
  og_holder: "",
  node_round: 0,
};
// Add the new fields to each wallet
for (const wallet of Object.keys(data)) {
  data[wallet] = {
    ...defaultFields,
    ...data[wallet], // Preserve existing data if fields already exist
  };
}
// Write the updated data back to the JSON file
fs.writeFileSync('data/nexis_holders_data.json', JSON.stringify(data, null, 4));

console.log('Updated JSON file with new fields added to every wallet.');