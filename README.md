<h1 align="center" > ZeroBin</h1>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#installation">Installation</a> •
  <a href="routes">Routes</a> •
  <a href="#presistence">Persistence</a> 
</p>


<h2 id="overview">🧠 Project Overview</h2>

ZeroBin is a lightweight paste-sharing application that allows users to create shareable text snippets with optional expiration time and view limits.  
Pastes automatically become unavailable once their constraints are reached.

---


<h2 id="prerequisites">📦 Prerequisites</h2>

- Node.js (v18 or later)
- npm
- A Redis instance (Redis Cloud or local Redis)

<h2 id="installation">📦 Installation</h2>

1. Clone the repository:
   ```bash
   git clone https://github.com/Sharifa26/zero.bin.git
   cd zero.bin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:
   ```bash
      REDIS_URL=your_redis_connection_url
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

<h2 id="routes">📦 Routes</h2>

The application has the following routes:

- `GET /api/healthz`: Checks if the application is running.
- `POST /api/pastes`: Creates a new paste.
- `GET /api/pastes/:id`: Retrieves a paste by its ID.
- `GET /p/:id`: Displays a paste by its ID.

<details>
<summary>POST /api/pastes</summary>

**Request Body**
```json
{
  "content": "Your paste content here...",
  "ttl_seconds": 3600,
  "max_views": null
}
```
**Response**
```json
{
  "url": "https://zerobin.net/p/your-paste-id",
  "id": "your-paste-id"
}
```
</details>

---

<h2 id="presistence">📦 Persistence layer</h2>

This project uses Redis as the persistence layer.

## Why Redis was chosen:

- Native support for TTL (time-to-live) expiration

- Atomic operations for enforcing view limits

- Fast performance and reliability

- Well-suited for serverless environments like Vercel



<h2 id="Important Design Decisions">📦 Important Design Decisions</h2>

- **Next.js App Router** - Used to combine frontend pages and backend API routes in a single project for simplicity and reliability.
- **Serverless API Routes** - All paste creation and retrieval logic is handled through /api routes, making the app easy to test via automated systems.
-**Deterministic Expiry Support** - The app supports a `TEST_MODE with` a custom `x-test-now-ms` header to enable deterministic expiry testing.
-**Minimal UI, Functional Focus** - The UI is intentionally clean and lightweight, prioritizing correctness, usability, and test reliability over heavy styling.

---

<h2 id="contributing">👩‍💻 Contributing</h2>

**Sharifa Sheriff** ✨
📧 Email: [sharifasheriff26@gmail.com](mailto:sharifasheriff26@gmail.com)

---

<h2 align="center">⭐ Built for learning, clarity, and correctness</h2>