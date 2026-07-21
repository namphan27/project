# PC Builder E-commerce Platform

A full-stack e-commerce platform for selling PC components with product management, authentication, order processing, and online payment integration.

## Features

### User

- Register/Login with JWT authentication
- Browse PC components
- Add products to cart
- Checkout and track orders
- Online payment via PayOS

### Admin

- Manage products
- Manage inventory
- Manage orders
- Update order status

## Tech Stack

Frontend:

- Next.js
- JavaScript
- Tailwind CSS

Backend:

- Node.js
- Express.js
- MySQL
- Prisma

Other:

- JWT Authentication
- PayOS API
- RESTful API

## System Architecture

Frontend (Next.js)
|
|
REST API
|
|
Backend (Express.js)
|
|
MySQL Database

## Database Design

- User
- Product
- Category
- Cart
- Order
- OrderItem

## Installation

Clone repository:

git clone ...

Install dependencies:

npm install

Run development:

npm run dev

## Environment Variables

DATABASE_URL=
JWT_SECRET=
PAYOS_CLIENT_ID=
PAYOS_API_KEY=

## Screenshots

(Add images here)

## Future Improvements

- Add product recommendation system
- Add Redis caching
- Add Docker deployment
