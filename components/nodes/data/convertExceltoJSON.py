import pandas as pd
import json
import os

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to Nodes.xlsx
excel_file_path = os.path.join(script_dir, 'Nodes.xlsx')

# Reading the Excel file into a DataFrame with error handling
try:
    print(f"Attempting to read '{excel_file_path}'...")
    sheet_df = pd.read_excel(excel_file_path, sheet_name='Sheet1')  # Update sheet_name if needed
    print("Excel file read successfully.")

    # Renaming columns to match the requested JSON keys
    sheet_df.columns = [
        'tier', 'price(USD)', 'totalLicensePerTier', 'capPerWallet',
        'whitelistedNumber', 'maxRaiseforWhitelist', 'numberPublicLicense',
        'raised', 'cumulativeRaise', 'fullFDV', 'impliedTierFDV'
    ]

    # Converting the DataFrame to JSON format
    json_data = sheet_df.to_dict(orient="records")

    # Writing JSON data to a file
    json_output_path = os.path.join(script_dir, 'Nodes.json')
    with open(json_output_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)

    # Optional: Display the first JSON record
    print("First JSON record:")
    print(json_data[0])

    # Optional: Print the original columns
    print("Original columns:")
    print(sheet_df.columns)

except FileNotFoundError:
    print(f"Error: '{excel_file_path}' file not found.")
    exit(1)
except ValueError as e:
    print(f"Error: {e}")
    exit(1)
except Exception as e:
    print(f"An unexpected error occurred while reading the Excel file: {e}")
    exit(1)
