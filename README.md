# NewsScope-innoscripta-test
NewsScope is a modern news aggregator application built with React, TypeScript, and React Query. It fetches and displays news articles from multiple sources, allowing users to search, filter, and customize their news feed.
## Features
- 🔍 **Search & Filter:** Users can search for articles and filter results by date, category, and source.
- 📌 **Personalized Feed:** Users can customize their news feed by selecting preferred sources and categories.
- 📱 **Responsive Design:** Optimized for mobile and desktop viewing.

## Tech Stack
- **React** (with TypeScript)
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Docker** for containerization
  
## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- Docker (optional, for containerized deployment)

### Branch
- development
  
### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/idungstanley/newsscope-innoscripta-test.git
   cd newsscope-innoscripta-test
   ```

2. **Install dependencies:**
  Ensure you have the following installed:

3. **Create a `.env` file** in the root directory and add your API keys:
   ```env
   VITE_GUARDIAN_API_KEY=your_api_key_here
   VITE_NEWS_API_KEY=your_api_key_here
   VITE_NYT_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
	@@ -47,20 +50,18 @@ Ensure you have the following installed:
## Running with Docker
1. **Build the Docker image:**
   ```sh
   docker build -t newshub .
   ```
2. **Run the container:**
   ```sh
   docker run -p 5173:5173 newshub
   ```

## Usage
- Navigate to `/` to browse news articles.
- Search and filter articles using the search bar.
- pagination


## License
MIT License © 2025 NewsScope Team
