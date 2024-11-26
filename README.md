# Countries Explorer Application with Weather Integration(React + TypeScript + Vite)

To successfully build the **Countries Explorer Application with Weather Integration**, here is a proposed implementation plan along with an architectural overview, challenges, and guidelines for completing the project:

---

### **1. Architecture and Design**

#### **Overall Architecture**
The application will follow a **modular and scalable architecture** based on React and TypeScript. It will be organized into reusable components, hooks, and services, ensuring maintainability and ease of testing.

**Key Layers:**
- **API Integration Layer:** 
  - Use Apollo Client to interact with the GraphQL Countries API.
  - Use Axios (or Fetch API) for RESTful calls to OpenWeatherMap API.
- **Presentation Layer:**
  - Fully responsive UI built with React components and styled with TailwindCSS.
  - Separate container and component layers for better state management and clear delineation of responsibilities.
- **State Management:**
  - Apollo Client cache for managing GraphQL query results.
  - React state for UI interactions (search, filter, sort).
- **Routing:**
  - React Router to navigate between pages, i.e., country list and country details.
- **TypeScript Models:**
  - Type-safe entities (e.g., `Country`, `Weather`) to avoid runtime errors and improve the development experience.

**Flow Overview:**
1. **Search/Filter/Sort Component** manages user input and state for filters.
2. Makes GraphQL calls to fetch a filtered/sorted list of countries from the Countries API.
3. Displays results in a paginated list with basic details (e.g., name, capital, region, flag).
4. On selecting a country, a detailed view fetches additional data (neighboring countries, languages, etc.) and issues a REST API call to the weather service.
5. Displays weather information for the selected country's capital city.

---

### **2. Core Features Implementation**

#### 2.1 Country Search
- **UI Component:** TextInput for entering a country's name with debounce logic (to limit GraphQL queries).
- **GraphQL Query:** Fetch filtered list of countries using the `graphql.country` public API.
- **Display:** Key country details — name, capital, region, and flag as a list/grid.

#### 2.2 Country Details with Weather Integration
- **UI/UX Design:** A standalone detail view for a selected country.
  - Languages, Currencies, Population, Neighboring Countries, Time Zones, and a corresponding country map.
- **Weather Integration:**
  - Fetch weather data via OpenWeatherMap API based on the capital city of the selected country.
  - Display temperature, weather condition, and an icon (using OpenWeatherMap's response).
- **Error Handling:** Show appropriate error messages for failed GraphQL queries or RESTful API calls (e.g., invalid API key or network errors).

#### 2.3 Filter and Sort
- **Filtering Options:**
  - Filter by region using a dropdown menu.
  - Filter by language.
- **Sorting Options:**
  - Sort by country name, population, or area. Implement sort logic on the client-side to improve response times.
- **UI Design:** Combined filters (dropdowns) and sorting options with clear buttons to reset filters.
- **GraphQL Query Updates:** Dynamically adjust queries based on applied filters and sorting.

#### 2.4 Responsivity
- **Responsiveness:** Ensure the application adapts to any screen size using CSS grid, flexbox, or a CSS-in-JS library like Styled Components.
- **Breakpoints:** Target various devices — mobile, tablets, and desktops.

---

### **3. Build and Configuration**

#### **Vite Build Tool**
- Use **Vite** for faster builds and lightweight development.
- Set up `vite.config.ts` for TypeScript and alias imports (e.g., `@components`, `@services`).
- Configure environment variables for sensitive data such as API keys.

#### **Environment Variables**
- `.env` file for sensitive data such as `REACT_APP_WEATHER_API_KEY`.

---

### **4. Detailed Tech Stack**

#### **Languages/Frameworks:**
- Frontend: React (SPA), React Router
- Styling: TailwindCSS
- API Clients: Apollo Client, Axios
- State Management: Apollo Cache/React State
- Build Tool: Vite

#### **APIs:**
- GraphQL
   - Countries API (`https://graphql.country`)
- REST
   - REST Countries API(`https://restcountries.com/v3.1`)
   - OpenWeatherMap API(`https://api.openweathermap.org/data/2.5/weather`)

#### **Utilities:**
- Debouncing: Lodash `debounce` for search optimization.
- GraphQL Schema Generation: `graphql-codegen` for auto-generating TypeScript types.

#### **Testing:**
- Unit Tests: React Testing Library & Jest (components, hooks).
- Integration Tests: Mock GraphQL and REST APIs.

---

### **5. Challenges and Solutions**

#### **Challenges:**
1. **API Rate Limits:**
   - OpenWeatherMap API has a free-tier rate limit. To address this, batch country details (e.g., pre-fetch weather for visible countries) and display cached data wherever possible.
2. **Asynchronous Data Fetching:**
   - Combining GraphQL and RESTful APIs requires careful state handling and error management. Managed using Apollo Client’s built-in loading/error states and retry logic with Axios interceptors.
3. **Responsive Design:**
   - Testing across multiple screen sizes and handling varying amounts of data dynamically.
4. **Real-Time Weather Updates:**
   - Weather data may not be real-time due to API delays. Clearly indicate when the data was last updated.

#### **Next Steps If Given More Time:**
- Add animations and transitions for smoother UI interactions.
- Implement regional map integration (e.g., using Leaflet.js).
- Improve caching for REST API calls for faster repeated lookups.

---

### **6. Instructions**

#### **How to Set Up the Project:**
1. Clone the repository:
   ```bash
   git clone https://github.com/pyindent/countries-weather-explorer.git
   cd countries-weather-explorer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and add:
   ```
   VITE_WEATHER_API_KEY=<your_openweather_api_key>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Run tests:
   ```bash
   npm run test
   ```

---

### **7. Deployment**

For deployment:
1. Use **Vercel** or **Netlify** for hassle-free deployment of the SPA with automatic builds.
2. Ensure `.env` production-ready keys are set up before deploying.

---

### **Sample GraphQL Query**

```graphql
query GetCountries($filter: String) {
  countries(filter: { name: { regex: $filter } }) {
    name
    code
    capital
    region: continent {
      name
    }
    languages {
      name
    }
    currencies
  }
}
```

---

### **Sample REST API Request**

**URL:**
```
https://api.openweathermap.org/data/2.5/weather?q={CAPITAL}&appid={API_KEY}&units=metric
```

**Response:**
```json
{
    "coord": {
        "lon": -75.6981,
        "lat": 45.4112
    },
    "weather": [
        {
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
        }
    ],
    "main": {
        "temp": 0.83,
        "feels_like": -3.66,
        "temp_min": 0.06,
        "temp_max": 1.76,
        "pressure": 1006,
        "humidity": 92,
        "sea_level": 1006,
        "grnd_level": 995
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.63,
        "deg": 80
    },
    "rain": {
        "1h": 1.78
    },
    "clouds": {
        "all": 100
    },
}
```

---

This setup ensures both functional features and quality assurance while providing clear instructions for usage and maintenance.