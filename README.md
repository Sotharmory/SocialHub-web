# AleySocialMedia

This project was generated using Angular CLI version 19.2.6.

## Features

- **User Authentication**: Secure login and registration system
- **Social Media Posts**: Create, edit, and interact with posts
- **Real-time Messaging**: Instant messaging between users
- **Fundraising Campaigns**: Support for charitable causes
- **Admin Dashboard**: Comprehensive admin panel for management
- **AI Integration**: Smart features powered by AI
- **Responsive Design**: Mobile-first approach

## Technology Stack

### Frontend
- **Angular 19**: Latest Angular framework
- **TypeScript**: Type-safe JavaScript
- **SCSS/CSS**: Advanced styling
- **RxJS**: Reactive programming

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Socket.io**: Real-time communication

### AI & ML
- **Groq API**: AI model integration
- **Python**: AI processing scripts

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset

### Posts Endpoints
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Messages Endpoints
- `GET /api/messages` - Get conversation messages
- `POST /api/messages` - Send new message
- `PUT /api/messages/:id` - Update message

## Deployment

### Production Build
```bash
ng build --configuration production
```

### Docker Deployment
```bash
docker build -t socialhub-web .
docker run -p 3000:3000 socialhub-web
```

### Environment Variables
- `NODE_ENV`: Set to 'production' for production
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret

## Project Structure

```
src/
├── app/                    # Main application code
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard and main pages
│   ├── core/              # Core services and guards
│   └── features/          # Feature modules
├── assets/                # Static assets
├── environments/          # Environment configuration
└── styles.css            # Global styles
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tson28/SocialHub-web.git
   cd SocialHub-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Configure your database and API keys

4. **Start the development server**
   ```bash
   ng serve
   ```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow Angular style guide
- Use meaningful commit messages
- Write tests for new features
- Update documentation as needed

## Development server

To start a local development server, run:

ng serve

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

ng generate component component-name

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

ng generate --help

## Building

To build the project run:

ng build

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the Karma test runner, use the following command:

ng test

## Running end-to-end tests

For end-to-end (e2e) testing, run:

ng e2e

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the Angular CLI Overview and Command Reference page.
