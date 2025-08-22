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

## Screenshots

### 🏠 Dashboard
![Dashboard](https://via.placeholder.com/800x400/4f46e5/ffffff?text=SocialHub+Dashboard)
*Main dashboard with posts feed and navigation*

### 💬 Messaging
![Messaging](https://via.placeholder.com/800x400/06b6d4/ffffff?text=Real-time+Messaging)
*Real-time messaging interface with conversation history*

### 💰 Fundraising
![Fundraising](https://via.placeholder.com/800x400/10b981/ffffff?text=Fundraising+Campaigns)
*Fundraising campaigns with progress tracking*

### 👤 Profile
![Profile](https://via.placeholder.com/800x400/f59e0b/ffffff?text=User+Profile)
*User profile management and customization*

### 📱 Mobile View
![Mobile](https://via.placeholder.com/400x600/8b5cf6/ffffff?text=Mobile+Responsive)
*Mobile-responsive design for all devices*

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

## Troubleshooting

### Common Issues & Solutions

#### 1. MongoDB Connection Error
```
Error: MongoNetworkError: failed to connect to server
```
**Solution:**
- Ensure MongoDB service is running
- Check if port 27017 is available
- Verify MONGODB_URI in .env file

#### 2. Angular CLI Not Found
```
ng: command not found
```
**Solution:**
```bash
npm install -g @angular/cli@latest
```

#### 3. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::4200
```
**Solution:**
```bash
ng serve --port 4201
# or kill the process using the port
lsof -ti:4200 | xargs kill -9
```

#### 4. Node Modules Issues
```
Module not found errors
```
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 5. JWT Token Expired
```
401 Unauthorized errors
```
**Solution:**
- Clear browser localStorage
- Log in again to get fresh token

### Getting Help
- Check the [Issues](https://github.com/Tson28/SocialHub-web/issues) page
- Contact the development team
- Review the documentation

## Changelog

### Version 2.1.0 (Latest)
- ✨ Enhanced AI integration with Groq API
- 🔧 Improved authentication system
- 🎨 Updated UI/UX design
- 🐛 Fixed messaging real-time updates
- 📱 Better mobile responsiveness

### Version 2.0.0
- 🚀 Major refactoring to Angular 19
- 💰 Added fundraising campaign features
- 🔒 Enhanced security measures
- 📊 Admin dashboard improvements
- 🌐 Socket.io integration for real-time features

### Version 1.5.0
- 👥 Friend system implementation
- 🔍 Advanced search functionality
- 📧 Email notification system
- 🖼️ Image upload capabilities
- 🎯 Performance optimizations

### Version 1.0.0
- 🎉 Initial release
- 👤 User authentication
- 📝 Basic posting system
- 💬 Simple messaging
- 📱 Responsive design

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

### MIT License

Copyright (c) 2024 SocialHub Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Third-Party Licenses
- **Angular**: MIT License
- **Node.js**: MIT License
- **MongoDB**: Server Side Public License (SSPL)
- **Socket.io**: MIT License

## Contact & Support

### Development Team
- **Lead Developer**: Nguyễn Thái Sơn (@Tson28)
- **Frontend Developer**: Winnie Pham (@phamthangph13)

### Contact Information
- 📧 **Email**: support@socialhub.dev
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Tson28/SocialHub-web/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Tson28/SocialHub-web/discussions)
- 📱 **Social Media**: @SocialHubDev

### Community
- 💬 **Discord**: [Join our community](https://discord.gg/socialhub)
- 📚 **Documentation**: [Wiki](https://github.com/Tson28/SocialHub-web/wiki)
- 🎓 **Tutorials**: [YouTube Channel](https://youtube.com/@socialhub)

### Business Inquiries
- 💼 **Partnerships**: partnerships@socialhub.dev
- 🏢 **Enterprise**: enterprise@socialhub.dev
