const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    // Delete existing users with these emails to avoid duplicates
    await User.deleteMany({ email: { $in: ['admin@example.com', 'manager@example.com', 'intern@example.com'] } });

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        team: 'Management'
      },
      {
        name: 'Manager User',
        email: 'manager@example.com',
        password: 'password123',
        role: 'manager',
        team: 'Engineering'
      },
      {
        name: 'Intern User',
        email: 'intern@example.com',
        password: 'password123',
        role: 'intern',
        team: 'Engineering'
      }
    ];

    await User.create(users);
    console.log('Sample users seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
