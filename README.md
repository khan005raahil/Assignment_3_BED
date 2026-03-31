# Event Registration API

## Project Overview

The Event Registration API is a RESTful backend application designed to manage event data efficiently using Node.js, Express, and Firebase Firestore. It allows users to create, retrieve, update, and delete events while ensuring all incoming data is validated using Joi.

This API solves the problem of handling inconsistent or invalid event data by enforcing strict validation rules before storing anything in the database. It ensures data integrity and reliability, which is critical for real-world applications like booking systems or event platforms.

This project is intended for developers who want a structured backend system with proper validation, clean architecture, and persistent storage using Firestore.

---

## Installation Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm installed
- Firebase project with Firestore enabled

---

### Step 1: Clone the Repository

git clone https://github.com/khan005raahil/Assignment_3_BED.git
cd Assignment_3_BED

---

### Step 2: Install Dependencies

npm install

---

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory and use .env.example as a template to add your Firebase credentials and other necessary environment variables.

---

### Step 4: Start the Server

npm start

---
