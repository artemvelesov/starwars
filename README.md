# 🌟 Star Wars Characters App

A modern React application built with TypeScript that allows users to explore Star Wars character information using the Star Wars API (SWAPI).

## ✨ Features

- **Character Browse**: View a paginated list of Star Wars characters
- **Search**: Find characters by name with real-time search functionality
- **Character Details**: View detailed information about each character
- **Local Editing**: Edit and save character information locally
- **Responsive Design**: Fully responsive UI that works on all devices

## 🚀 Technologies Used

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library

## 🛠️ Getting Started

### Prerequisites
- Node.js 20.18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd starwars
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run lint` - Run ESLint

## 📱 Usage

### Browsing Characters
1. The main page displays a grid of Star Wars characters
2. Use the search bar to find specific characters by name
3. Navigate through pages using the pagination controls
4. Click "View Details" on any character card to see more information

### Editing Characters
1. Navigate to a character's detail page
2. Click the "Edit Character" button
3. Modify any of the editable fields (name, height, mass, etc.)
4. Click "Save Changes" to store your edits locally
5. Edited characters are marked with an "Edited" badge

### Data Persistence
- All edits are saved to browser localStorage
- Edited character data persists across browser sessions
- The navigation bar shows a counter of edited characters

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   └── Navigation.tsx
├── pages/              # Page components
│   ├── CharactersPage.tsx
│   └── CharacterDetailPage.tsx
├── hooks/              # Custom React hooks
│   └── useCharacters.ts
├── services/           # API and business logic
│   ├── swapiService.ts
│   └── localStorageService.ts
├── types/              # TypeScript type definitions
│   └── swapi.ts
├── utils/              # Utility functions
│   └── debounce.ts
└── __tests__/          # Test files
    ├── components/
    ├── services/
    └── utils/
```

## 🧪 Testing

The project includes comprehensive unit tests:

- **Utils**: `debounce.test.ts` (3 tests)
- **Services**: `localStorageService.test.ts` (15 tests)
- **Components**: `ErrorBoundary.test.tsx` (7 tests)

**Total**: 25 passing tests

Run tests with:
```bash
npm run test
```

## 🚀 Production Deployment

### Build Process
```bash
npm run build
```

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgments

- [SWAPI](https://swapi.tech/) for providing the Star Wars API
- [Material-UI](https://mui.com/) for the component library
- [React Query](https://tanstack.com/query) for state management

---

**May the Force be with your code! ⭐️**
