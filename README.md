# NewsScope-innoscripta-test
NewsScope is a modern news aggregator application built with React, TypeScript, and React Query. It fetches and displays news articles from multiple sources, allowing users to search, filter, and customize their news feed.

## Features
- 🔍 **Search & Filter:** Users can search for articles and filter results by date, category, and source.
- 📌 **Personalized Feed:** Users can customize their news feed by selecting preferred sources and categories.
- 📱 **Responsive Design:** Optimized for mobile and desktop viewing.
- 🚀 **Powered by React Query:** Efficient data fetching and caching for a seamless experience.

## Tech Stack
- **React** (with TypeScript)
- **React Router** for navigation
- **React Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Docker** for containerization

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- Docker (optional, for containerized deployment)

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/idungstanley/newsScope-innoscripta-test.git
   cd newsScope-innoscripta-test
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your API keys:
   ```env
   REACT_APP_NEWS_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (if using Vite).

## Running with Docker
1. **Build the Docker image:**
   ```sh
   docker build -t newsScope-innoscripta-test .
   ```
2. **Run the container:**
   ```sh
   docker run -p 3000:3000 newsScope-innoscripta-test
   ```

## Usage
- Navigate to `/` to browse news articles.
- Go to `/preferences` to set your preferred sources and categories.
- Search and filter articles using the search bar.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
MIT License © 2025 NewsScope Team
