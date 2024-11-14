# Strajk Bowling🎳

**Strajk Bowling** is a web application built with React and TypeScript that enables users to book bowling lanes for groups of people. The app allows users to select the number of lanes, specify shoe sizes for each player, and receive a booking confirmation.
 
## Features
* **Book Bowling Lanes:**
Users can select the date and time for their booking, specify the number of players, and choose the required number of lanes.
* **Add Shoe Sizes:**
For each player, the app provides an option to add their shoe size.
* **Dynamic Validation:**
Ensures the number of players aligns with the number of lanes (maximum of 4 players per lane).
Validates that each player has an associated shoe size.
* **Booking Confirmation:** After submitting the booking request, users receive a confirmation with the total price and booking ID.

## Requirements
* **React** with TypeScript for component-based UI development.
* **React Router** for handling page navigation.
* **Fetch API** for making HTTP requests to a backend API.
* **CSS Flexbox** for responsive layout design.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/strajk-bowling.git
   cd strajk-bowling
2. Install dependencies:
   ```
   npm install
3. Start the development server:
   ```
   npm run dev
4. Open the app in your browser at http://localhost:5173
## Example API Request
The app sends a booking request to the backend API using the following structure:
```
{
  "when": "2024-11-15T18:00",
  "lanes": 2,
  "people": 5,
  "shoes": [38, 39, 42, 43, 44]
}
```
### API response:
```
{
  "when": "2024-11-15T18:00",
  "lanes": 2,
  "people": 5,
  "shoes": [38, 39, 42, 43, 44],
  "price": 680,
  "id": "STR7283472",
  "active": true
}
