const mongoose = require('mongoose');
const Certificate = require('./models/Certificate');
require('dotenv').config();

const seedCertificates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');

    // Clear existing certificates
    await Certificate.deleteMany({});

    const certificates = [
      {
        title: "Java Programming Certification",
        status: "In Progress",
        issuer: "Oracle",
        credentialId: "JAVA-2024-001"
      },
      {
        title: "Full Stack Web Development Certification",
        status: "Planned",
        issuer: "Coursera",
        credentialId: "FSWD-2024-002"
      },
      {
        title: "Data Structures & Algorithms Certification",
        status: "In Progress",
        issuer: "LeetCode",
        credentialId: "DSA-2024-003"
      }
    ];

    await Certificate.insertMany(certificates);
    console.log('Certificates seeded successfully');
  } catch (error) {
    console.error('Error seeding certificates:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedCertificates();