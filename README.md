# Activity Feeds App

This is the Activity Feeds app built using React and Node.
This application will allow users to view, create, and interact with posts.

## Basic Setup

- Prerequisites

  - Install the packages

    ```bash
    # frontend
    cd frontend
    npm install
    cd ..

    # backend
    cd backend
    npm install
    cd ..
    ```

  - Create environment files

    ```bash
    # frontend
    cd frontend
    cp .env.example .env
    cd ..

    # backend
    cd backend
    cp .env.example .env
    cd ..
    ```

  - Install Global packages

    ```bash
    # install sequelize cli
    npm i sequelize-cli -g

    # install postgresql
    brew install postgresql
    brew services start postgresql
    createuser -s postgres
    brew services restart postgresql
    ```

  - Create database with name "activityfeeddb_dev"

  - Execute migrations and seeds

    ```bash
    cd backend
    npm run db:migrate
    npm run db:seed:all
    cd ..
    ```

- Start application

  ```bash
  # backend
  cd backend
  npm run dev
  cd ..

  # frontend
  cd frontend
  npm start
  cd ..
  ```

## Technologies

- React 18
- Redux, Redux Saga
- Typescript
- Material UI v5
- Node/Express
- ORM: Sequelize
- socket.io
