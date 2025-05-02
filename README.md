# Countries Explorer

A React application that allows users to explore countries using the REST Countries API. Built with React, TypeScript, and Tailwind CSS.

## Features

- View all countries with their basic information
- Search countries by name
- Filter countries by region
- Responsive design
- Modern UI with Tailwind CSS

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Axios

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
  ├── components/      # Reusable UI components
  ├── pages/          # Page components
  ├── services/       # API services
  ├── hooks/          # Custom React hooks
  ├── types/          # TypeScript type definitions
  └── utils/          # Utility functions
```

## API Reference

This project uses the [REST Countries API](https://restcountries.com/) to fetch country data. The following endpoints are used:

- GET /all - Get all countries
- GET /name/{name} - Search country by name
- GET /region/{region} - Filter countries by region
- GET /alpha/{code} - Get country by code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 