# Portfolio Backend

Express.js backend with MongoDB for the portfolio website.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env` if needed

3. Seed the database with certificates:
   ```bash
   node seed.js
   ```

4. Start the server:
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production
   ```

## API Endpoints

### Contacts
- `POST /api/contacts` - Save contact form submission
- `GET /api/contacts` - Get all contact messages (admin)

### Certificates
- `GET /api/certificates` - Get all certificates
- `POST /api/certificates` - Add new certificate (admin)
- `PUT /api/certificates/:id` - Update certificate (admin)
- `DELETE /api/certificates/:id` - Delete certificate (admin)

## Environment Variables

Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

## EmailJS Setup (Frontend)

For the contact form to send emails, set up EmailJS:

1. Create account at https://www.emailjs.com/
2. Create email service, template, and get your keys
3. Update `.env` in the frontend root:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```