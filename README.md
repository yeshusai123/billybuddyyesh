# Billy - AI-Powered Cyberbullying Prevention Platform

Billy is a cutting-edge platform that leverages artificial intelligence to prevent cyberbullying and create safer digital spaces. The platform provides real-time support, threat detection, and a supportive community environment.

## 🚀 Features

- **AI-Powered Analysis**: Advanced machine learning for real-time cyberbullying detection
- **Secure Reporting**: Anonymous and encrypted reporting system
- **24/7 Support**: Immediate AI-driven assistance through chat
- **Community Support**: Moderated space for sharing experiences
- **Smart Alerts**: Real-time notification system for potential threats
- **Privacy-First**: End-to-end encryption and anonymous reporting options

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google's Generative AI (Gemini)
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Email**: Nodemailer
- **SMS**: Twilio

## 📁 Project Structure

```
billy-cyberbullying-platform/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── background/      # Background effects components
│   │   ├── community/       # Community section components
│   │   ├── home/           # Home page components
│   │   └── hero/           # Hero section components
│   ├── pages/              # Page components
│   ├── services/           # API and external services
│   │   ├── api/           # REST API services
│   │   └── gemini/        # AI chat integration
│   ├── styles/            # Global styles and theme
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── server/                # Backend server
│   ├── config/           # Server configuration
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── utils/            # Server utilities
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Gemini API key
- Twilio account (for SMS)
- SMTP server (for email)

### MongoDB Setup

1. **Install MongoDB**:
   ```bash
   # Ubuntu
   sudo apt update
   sudo apt install mongodb

   # macOS (using Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB Service**:
   ```bash
   # Ubuntu
   sudo systemctl start mongodb
   sudo systemctl enable mongodb

   # macOS
   brew services start mongodb-community
   ```

3. **Create Database and User**:
   ```bash
   # Access MongoDB shell
   mongosh

   # Create database
   use billy-platform

   # Create user with permissions
   db.createUser({
     user: "billy_admin",
     pwd: "your_secure_password",
     roles: ["readWrite", "dbAdmin"]
   })
   ```

4. **Verify Connection**:
   ```bash
   # Test connection
   mongosh "mongodb://billy_admin:your_secure_password@localhost:27017/billy-platform"
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
MONGODB_URI=mongodb://billy_admin:your_secure_password@localhost:27017/billy-platform
JWT_SECRET=your_jwt_secret

# External Services
GEMINI_API_KEY=your_gemini_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone

# Email
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
AUTHORITY_EMAIL=authority@example.com
```

### Project Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/billy-cyberbullying-platform.git
   cd billy-cyberbullying-platform
   ```

2. **Install dependencies**:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Start development servers**:
   ```bash
   # Terminal 1: Start MongoDB (if not running as a service)
   mongod

   # Terminal 2: Start backend server
   npm run server

   # Terminal 3: Start frontend development server
   npm run dev
   ```

4. **Access the application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### Database Management

- **Backup Database**:
  ```bash
  mongodump --db billy-platform --out ./backup
  ```

- **Restore Database**:
  ```bash
  mongorestore --db billy-platform ./backup/billy-platform
  ```

- **Monitor Database**:
  ```bash
  # Check database status
  mongosh --eval "db.serverStatus()"

  # Monitor logs
  tail -f /var/log/mongodb/mongodb.log
  ```

## 🔒 Security Features

- End-to-end encryption for chat messages
- Anonymous reporting system
- Secure file upload handling
- JWT authentication
- Rate limiting
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## 📝 Code Style Guidelines

- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Document complex functions and components
- Create small, focused components
- Extract reusable logic into hooks or utilities
- Use proper naming conventions
- Maintain consistent file structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Veerendragouda H** 
- **Lokesh J** 
- **Sheetal Ramesh** 
- **S Yeswanth Sai** 

## 🙏 Acknowledgments

- Google's Generative AI team for Gemini
- The React and Vite communities
- All contributors and supporters

## 📞 Support

For support, email lokesh.j.kurubarahalli.121@gmail.com.