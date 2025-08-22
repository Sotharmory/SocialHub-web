# SocialHub - Aley Social Media Platform

🚀 A modern, feature-rich social media platform built with Angular and Node.js

## Project Overview

SocialHub is a comprehensive social media application that combines traditional social networking features with innovative fundraising capabilities and AI-powered interactions. Built with modern web technologies, it provides users with a seamless experience for connecting, sharing, and supporting meaningful causes.

### Key Highlights
- 🔐 **Secure Authentication** - JWT-based authentication system
- 💬 **Real-time Messaging** - Instant communication with Socket.io
- 📱 **Responsive Design** - Mobile-first approach
- 🤖 **AI Integration** - Smart features powered by Groq API
- 💰 **Fundraising Platform** - Support charitable causes
- 👥 **Social Features** - Posts, friends, notifications

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Angular CLI** (v19.0.0 or higher) - Install with `npm install -g @angular/cli`
- **MongoDB** (v5.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)

### Optional Tools
- **Git** - For version control
- **VS Code** - Recommended IDE with Angular extensions
- **Postman** - For API testing
- **MongoDB Compass** - GUI for MongoDB

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux Ubuntu 18.04+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space

## Database Setup

### MongoDB Installation & Configuration

1. **Install MongoDB Community Edition**
   ```bash
   # On macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   
   # On Windows
   # Download from https://www.mongodb.com/try/download/community
   
   # On Ubuntu
   sudo apt-get install -y mongodb
   ```

2. **Start MongoDB Service**
   ```bash
   # On macOS
   brew services start mongodb/brew/mongodb-community
   
   # On Windows
   net start MongoDB
   
   # On Linux
   sudo systemctl start mongod
   ```

3. **Create Database**
   ```bash
   mongosh
   use aley_social_media
   db.createCollection("users")
   db.createCollection("posts")
   db.createCollection("messages")
   ```

4. **Set up Environment Variables**
   ```bash
   # Create .env file in root directory
   MONGODB_URI=mongodb://localhost:27017/aley_social_media
   JWT_SECRET=your-super-secret-jwt-key
   GROQ_API_KEY=your-groq-api-key
   NODE_ENV=development
   PORT=3000
   ```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
