import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://thbukezhmevpjjliguyg.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoYnVrZXpobWV2cGpqbGlndXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NjQwMDksImV4cCI6MjA0NTU0MDAwOX0.roEo8gS1B8ZIHLftk9EzYhelmeY9H9wWXqTQNnWMtA8'; // Keep this key secure
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Define TypeScript interfaces
interface HolderData {
  purchaseAmount: number;
  totalNZT: number;
  valueTGE: number;
  unlockTGE: number;
  vestingPeriod: number;
  vestingStyle: string;
  vestingStart: string; // Expected in MM/DD/YYYY format
  vestingEnd: string;   // Expected in MM/DD/YYYY format
  percentGain: string;  // e.g., "153.33%"
  estDailyUnlock: number;
  referral_code: string;
  referral_points: number;
  staking_points: number;
  on_chain_points: number;
  social_points: number;
}

interface Record {
  id: string;
  purchase_amount: number;
  total_nzt: number;
  value_tge: number;
  unlock_tge: number;
  vesting_period: number;
  vesting_style: string;
  vesting_start: string; // YYYY-MM-DD format
  vesting_end: string;   // YYYY-MM-DD format
  percent_gain: number;
  est_daily_unlock: number;
  referral_code: string;
  referral_points: number;
  staking_points: number;
  on_chain_points: number;
  social_points: number;
  nodes_owned: number;
  nodes_staked: number;
  nzt_staked: number;
  sold_nzt: string;
  og_holder: string;
  node_round: number;
}

// Read the JSON file
const data: { [address: string]: HolderData } = JSON.parse(
  fs.readFileSync('data/nexis_holders_data.json', 'utf8')
);

async function importData() {
  try {
    const records: Record[] = [];

    for (const [address, holderData] of Object.entries(data)) {
      // Validate and prepare the data
      const record: Record = {
        id: address,
        purchase_amount: holderData.purchaseAmount,
        total_nzt: holderData.totalNZT,
        value_tge: holderData.valueTGE,
        unlock_tge: holderData.unlockTGE,
        vesting_period: holderData.vestingPeriod,
        vesting_style: holderData.vestingStyle,
        vesting_start: parseDate(holderData.vestingStart),
        vesting_end: parseDate(holderData.vestingEnd),
        percent_gain: Number.parseFloat(holderData.percentGain.replace('%', '')) / 100,
        est_daily_unlock: holderData.estDailyUnlock,
        referral_code: holderData.referral_code || "",
        referral_points: holderData.referral_points || 0,
        staking_points: holderData.staking_points || 0,
        on_chain_points: holderData.on_chain_points || 0,
        social_points: holderData.social_points || 0,
        nodes_owned: 0,
        nodes_staked: 0,
        nzt_staked: 0,
        sold_nzt: "",
        og_holder: "",
        node_round: 0,
      };

      records.push(record);
    }

    // Batch insert records
    const { error } = await supabase.from('nexis_holders').insert(records);

    if (error) {
      console.error('Error inserting records:', error);
    } else {
      console.log('Data imported successfully.');
    }
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

function parseDate(dateStr: string): string {
  // Assuming date is in MM/DD/YYYY format
  const [month, day, year] = dateStr.split('/');
  if (!month || !day || !year) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Convert to YYYY-MM-DD format
}

function parsePercent(percentStr: string): number {
  // Convert "153.33%" to 1.5333
  if (!percentStr.endsWith('%')) {
    throw new Error(`Invalid percent format: ${percentStr}`);
  }
  return Number.parseFloat(percentStr.replace('%', '')) / 100;
}

importData().catch((error) => {
  console.error('Error importing data:', error);
}); 