import json
import os

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Path to Nodes.json
json_file_path = os.path.join(script_dir, 'Nodes.json')

# Load the JSON data
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# Update the data
for tier_data in data:
    tier_num = tier_data.get("tier", 0)

    if 1 <= tier_num <= 4:
        # Tiers 1-4 are sold out
        tier_data["soldOut"] = "yes"
        tier_data["soldNodes"] = tier_data["totalLicensePerTier"]
        tier_data["remainingNodes"] = 0
    else:
        # Tiers 5-43 are not sold out
        tier_data["soldOut"] = "no"
        # Assuming no nodes are sold yet for these tiers
        tier_data["soldNodes"] = 0
        tier_data["remainingNodes"] = tier_data["totalLicensePerTier"]

# Save the updated data back to Nodes.json
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4) 