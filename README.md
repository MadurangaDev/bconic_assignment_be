# Courier Service Application (Back-End)

A modern courier service application built with the PERN stack (PostgreSQL, Express, React, Node.js) using TypeScript. This application allows clients to create and track shipments, while providing administrative capabilities for managing the courier service operations.

## Features

- User Registration and Authentication
- Shipment Creation and Management
- Shipment Tracking
- User Dashboard for Shipment Overview
- Admin Dashboard for Shipment Management
- Secure Authentication and Authorization
- Error Handling and Validation


## Tech Stack

- Node.js
- Express
- TypeScript
- Zod Validations
- Swagger Documentation
- PostgreSQL
- JWT Authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm (recommended) or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MadurangaDev/bconic_assignment_be.git
cd bconic_assignment_be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the backend directory with the following variables:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/courier_service
JWT_SECRET=your_jwt_secret
```

### 4. Database Setup

1. Create a PostgreSQL database named `courier_service`
2. Run the database migrations:

```bash
npx prisma db push
```
Or
```bash
npx prisma migrate dev
```

### 5. Running the Application


Start the backend server by running:
```bash
npm run dev
```


The application will be available at:
- Backend API: http://localhost:3000


## Project Structure

```
bconic_assignment_be/
├── .git/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── configs/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── server.ts
├── .gitignore
├── nodemon.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when running the backend server.
(Not Completed Yet)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Future Enhancements

1. Multiple authentication roles.
2. Real-time shipment tracking using WebSocket
3. Mobile application development
4. Integration with third-party logistics providers
5. Advanced analytics dashboard
6. Automated route optimization
7. Customer feedback and rating system
8. Bulk shipment creation
9. Integration with payment gateways
10. Multi-language support
11. Advanced reporting features