# Booking Application

## Installation

1. **Clone the repository**:

   ```bash
   git clone git-url
   cd event-booking
   ```

2. **Install dependencies for both FE & BE**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory for both FE and BE and include the following:

## Environment Variables

```env BE
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=bookings_db
DB_USER=booking_user
DB_PASSWORD=DB_Password
NODE_ENV=development

JWT_USER_ACCESS_SECRET=your-secret
JWT_USER_ACCESS_EXPIRATION=expire-time
JWT_COOKIE_EXPIRES_IN=expire-time

# Email
EMAIL_ADDRESS = ""
EMAIL_NAME = ""
EMAIL_TO = ""
EMAIL_PORT = ""
EMAIL_PASSWORD = ""
EMAIL_ACCESS_KEY = "test1234"
```

```env FE
VITE_APP_BASE_URL="http://localhost:5000/api/v1"

```

4. **Run the backend**:

   ```bash
   npm run dev
   ```

5. **Run the frontend**:
   ```bash
   npm run dev
   ```
