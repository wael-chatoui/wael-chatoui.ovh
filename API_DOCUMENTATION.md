# API Documentation

## 📡 API Routes for Portfolio Backoffice

All API routes are located in `/app/api/` and use Supabase for database operations.

---

## 🧩 Skills API

### POST `/api/skills`
Create a new skill.

**Request Body:**
```json
{
  "name": "React",
  "category": "Frontend",
  "level": "Expert",
  "icon_url": "https://example.com/react-icon.svg"
}
```

**Required Fields:**
- `name` (string)
- `category` (string)
- `level` (string)

**Optional Fields:**
- `icon_url` (string)

**Success Response (201):**
```json
{
  "message": "Skill created successfully",
  "data": {
    "id": 1,
    "name": "React",
    "category": "Frontend",
    "level": "Expert",
    "icon_url": "https://example.com/react-icon.svg",
    "created_at": "2024-11-07T..."
  }
}
```

**Error Responses:**
- `400`: Missing required fields
- `409`: Skill with this name already exists
- `500`: Server error

### GET `/api/skills`
Fetch all skills.

**Success Response (200):**
```json
{
  "message": "Skills fetched successfully",
  "data": [...],
  "count": 10
}
```

---

## 🏆 Hackathons API

### POST `/api/hackathons`
Create a new hackathon entry.

**Request Body:**
```json
{
  "name": "HackMIT 2024",
  "organized_by": "MIT",
  "start_date": "2024-09-15",
  "end_date": "2024-09-17",
  "location": "Boston, MA",
  "description": "Built an AI-powered...",
  "image_url": "https://...",
  "github_link": "https://github.com/...",
  "project_link": "https://...",
  "role": "Frontend Developer",
  "team_size": 4
}
```

**Required Fields:**
- `name` (string)
- `start_date` (date)
- `end_date` (date)

**Optional Fields:**
- `organized_by`, `location`, `description`, `image_url`, `github_link`, `project_link`, `role`, `team_size`

**Success Response (201):**
```json
{
  "message": "Hackathon created successfully",
  "data": { ... }
}
```

### GET `/api/hackathons`
Fetch all hackathons (ordered by start_date, newest first).

---

## 💼 Professional Experiences API

### POST `/api/experiences`
Create a new professional experience.

**Request Body:**
```json
{
  "company_name": "Google",
  "role": "Senior Frontend Developer",
  "start_date": "2023-01-15",
  "end_date": "2024-06-30",
  "location": "Paris, France",
  "description": "Led the development of...",
  "image_url": "https://...",
  "website": "https://google.com",
  "github_link": "https://github.com/..."
}
```

**Required Fields:**
- `company_name` (string)
- `role` (string)
- `start_date` (date)

**Optional Fields:**
- `end_date` (date) - Leave empty for current positions
- `location`, `description`, `image_url`, `website`, `github_link`

**Success Response (201):**
```json
{
  "message": "Experience created successfully",
  "data": { ... }
}
```

### GET `/api/experiences`
Fetch all experiences (ordered by start_date, newest first).

---

## 🚀 Side Projects API

### POST `/api/projects`
Create a new side project.

**Request Body:**
```json
{
  "name": "My Awesome App",
  "description": "A full-stack application that...",
  "github_link": "https://github.com/...",
  "live_link": "https://myapp.com",
  "image_url": "https://...",
  "featured": true
}
```

**Required Fields:**
- `name` (string)
- `description` (string)

**Optional Fields:**
- `github_link`, `live_link`, `image_url`
- `featured` (boolean) - Default: false

**Success Response (201):**
```json
{
  "message": "Project created successfully",
  "data": { ... }
}
```

### GET `/api/projects`
Fetch all projects (ordered by created_at, newest first).

**Query Parameters:**
- `featured=true` - Filter for featured projects only

**Example:**
```
GET /api/projects?featured=true
```

---

## 🔒 Authentication

Currently, the API routes do not require authentication. They use Supabase client with environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Note:** In production, you should add authentication middleware to protect these routes.

---

## 🛠️ Error Handling

All API routes follow a consistent error response format:

```json
{
  "error": "Error message",
  "details": "Detailed error information (optional)"
}
```

**Common HTTP Status Codes:**
- `200`: Success (GET requests)
- `201`: Created (POST requests)
- `400`: Bad Request (missing/invalid data)
- `409`: Conflict (duplicate entry)
- `500`: Internal Server Error

---

## 📝 Usage Example

### From the Backoffice Forms:

```typescript
const response = await fetch('/api/skills', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'React',
    category: 'Frontend',
    level: 'Expert',
    icon_url: 'https://...'
  }),
});

const result = await response.json();

if (!response.ok) {
  throw new Error(result.error);
}

console.log('Success:', result.data);
```

### From External Applications:

```bash
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Python",
    "category": "Backend",
    "level": "Advanced"
  }'
```

---

## 🗄️ Database Schema

All API routes interact with the following Supabase tables:
- `skills`
- `hackathons`
- `professional_experiences`
- `side_projects`

See `db.txt` for the complete database schema.

---

## 🚀 Next Steps

1. **Add Authentication**: Protect API routes with middleware
2. **Add UPDATE/DELETE**: Implement PATCH and DELETE methods
3. **Add Pagination**: For GET requests with many records
4. **Add Filtering**: More query parameters for GET requests
5. **Add Validation**: Use Zod or similar for request validation
6. **Add Rate Limiting**: Prevent abuse
7. **Add Logging**: Track API usage and errors

---

## 💡 Tips

- All dates should be in ISO format: `YYYY-MM-DD`
- URLs should include protocol: `https://...`
- The `featured` field for projects is useful for homepage highlights
- Use `end_date: null` for current positions in experiences
- Skill names must be unique (enforced by database constraint)
