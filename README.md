# Personal Finance Tracker

## Overview

This is a personal finance tracking application designed to help you manage and analyze your expenses. It uses a modern tech stack to provide a seamless experience for tracking monthly expenses and viewing comparisons across different months.

## Tech Stack

- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma

## Features

- **Expense Tracking**: Add and categorize your expenses in a structured table format.
- **Monthly Overview**: View expenses categorized by month.
- **Expense Comparison**: Compare expenses across different months to identify trends and differences.

## Getting Started

To get started with this application, follow these steps:

### Prerequisites

- Node.js (v18 or higher)
- Docker
- Docker Compose

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/stas3729/mguard.git
   cd your-repo

## Installation

2. **Build and Start the Application**

   Use Docker Compose to build the images and start the services. This will also handle database migrations:

   ```bash
   docker compose build --no-cache
   docker compose up

## Installation

3. **Install Backend Dependencies** (Optional)

   If you need to manually install or update dependencies, navigate to the api directory:

   ```bash
   cd api
   yarn install

4. **Access the Application**

   With the backend and database services running, the application will be accessible via the configured backend port. You can interact with the application using the API endpoints provided by the backend. API documentation will be available via Swagger or other documentation methods integrated into the application.

## Usage

- **Add Expenses**: Use the backend endpoints to input your expenses. API documentation will be available via Swagger or other integrated documentation methods.
- **View Expenses**: Check the database to view monthly overviews and category breakdowns.
- **Compare**: Analyze differences between expenses across different months using the provided features.

