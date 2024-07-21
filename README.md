# Tetris React App

This project is a modern implementation of the classic Tetris game using React. It was created on July 21, 2024, with the assistance of Claude 3.5 Sonnet, an AI language model developed by Anthropic.

## Project Overview

This Tetris game is built using React and features:
- Classic Tetris gameplay
- Score tracking
- Game over detection
- Piece rotation and movement
- Responsive design with Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the Tetris game, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/tetris-react.git
   ```
2. Navigate to the project directory:
   ```
   cd tetris-react
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the Tetris game locally:

1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and visit `http://localhost:3000`

## Game Controls

- Left Arrow: Move piece left
- Right Arrow: Move piece right
- Down Arrow: Move piece down
- Up Arrow: Rotate piece

## Project Structure

```
tetris-react/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── package.json
├── tailwind.config.js
└── README.md
```

## Dependencies

This project uses the following main dependencies:
- React
- Create React App
- Tailwind CSS

For a full list of dependencies, please refer to the `package.json` file.

## Deployment

This app can be easily deployed on platforms like Vercel or Netlify. Follow these general steps:

1. Create an account on Vercel or Netlify
2. Connect your GitHub repository to your Vercel/Netlify account
3. Configure the build settings:
   - Build command: `npm run build`
   - Output directory: `build`
4. Deploy the app

## Contributing

Contributions to this Tetris project are welcome. Please ensure to update tests as appropriate.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Game logic inspired by various Tetris implementations available online.
- Special thanks to Claude 3.5 Sonnet (Anthropic, 2024) for assistance in development and documentation.

---

Created with the assistance of Claude 3.5 Sonnet (Anthropic, July 2024)