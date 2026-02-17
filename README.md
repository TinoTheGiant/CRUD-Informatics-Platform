# Sports Informatics CRUD App (CrossFit Edition)

This is a Node.js/Express application for managing CrossFit affiliates, athletes, workouts, and scores, using PostgreSQL and Prisma.
<img width="1162" height="576" alt="image" src="https://github.com/user-attachments/assets/6fe23bae-8e44-4432-bb68-6f796402a8eb" />


## Prerequisites

- Node.js (v16+)
- PostgreSQL (running locally)

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Database Configuration**:
    - Ensure PostgreSQL is running.
    - Update the `.env` file with your database credentials if different from the default:
      ```
      DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sports_db"
      ```

3.  **Initialize Database**:
    - Run the following command to create the database tables:
    ```bash
    npx prisma migrate dev --name init
    ```
    > **Note**: If this fails, ensure your PostgreSQL server is running and the credentials in `.env` are correct.

4.  **Start the Server**:
    ```bash
    npm run dev
    ```

## API Endpoints

- **Affiliates**: `/api/affiliates`
- **Athletes**: `/api/athletes`
- **Workouts**: `/api/workouts`
- **Scores**: `/api/scores`

## Testing

You can use the provided manual test script to verify the API (ensure the server is running first):

```bash
npx ts-node scripts/test-manual.ts
```
