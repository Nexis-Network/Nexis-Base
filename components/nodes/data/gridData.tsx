import type { GridColDef, GridRowsProp } from "@mui/x-data-grid"

import nodesData from "./Nodes.json" // Adjust the path if necessary

interface NodeData {
  tier: number
  "price(USD)": number
  totalLicensePerTier: number
  capPerWallet: number | string
  whitelistedNumber: number
  maxRaiseforWhitelist: number
  numberPublicLicense: number
  raised: number
  cumulativeRaise: number
  fullFDV: number
  impliedTierFDV: number
  soldNodes: number
  remainingNodes: number
  soldOut: string
}

// Define your columns
export const columns: GridColDef[] = [
  { field: "tier", headerName: "Tier", flex: 1 },
  { field: "price(USD)", headerName: "Price (USD)", flex: 1 },
  { field: "totalLicensePerTier", headerName: "Total Licenses", flex: 1 },
  { field: "capPerWallet", headerName: "Cap per Wallet", flex: 1 },
  { field: "soldNodes", headerName: "Sold Nodes", flex: 1 },
  { field: "remainingNodes", headerName: "Remaining Nodes", flex: 1 },
  { field: "soldOut", headerName: "Sold Out", flex: 1 },
  // ... add other columns as needed ...
]

// Use the imported JSON data as rows
export const rows: GridRowsProp = nodesData as NodeData[]

// Now you can use `columns` and `rows` in your DataGrid component
