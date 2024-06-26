# To-do

All items are ordered by priority.

## Auto Updater (HIGHEST PRIORITY)

### General

- Check if it's possible to fetch updates from a private repository using some kind of key or access token
- Stable versions should only check for stable updates; same for unstable

## Update Resume Screen

### General

- Pops up after a new update occurs
- Can be read anytime at settings menu
- Displays data from file located at `/public` folder

## Automator

### Schema Saving System (SSS)

- System to save steps and variables in a JSON file
- List all saved files (from Tauri's official data folder)
- Import / Export files (import copies from other folder to data folder; export does the opposite)
- Remove test steps and variables after implementing

### Steps

- Disable "Run Automation" button while automation is running (add spinner)
- Add keyboard combination press step (`Ctrl + Shift + K` for example)
- Add conditional step (`if`, `else`, `else if`)
- Move mouse: Check if mouse position is valid (use `autopilot::screen.is_point_visible`)
- Move mouse: Add "smooth movement" option

## Settings Menu

### Auto Updater

- Configure key/access token (if possible)

### Automator

- Configure time between steps execution

## Spreadsheet Formatter

### General

- Read data from base spreadsheet
- Transform into target stylesheet layout

## Inmetro Seal Generator

### General

- Discuss implementation details
- Select logos and text to be inserted in the seal
- Compact the seal the most possible
- Add the most possible number of seals in an A4 paper sheet
- Print paper sheet (if possible)
- Generate `.png` / `.docx` / `.pdf` file
