// Script to create an admin user for testing
// Run with: node scripts/create-admin.js

const fetch = require('node-fetch');

async function createAdmin() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/create-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin123!',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: Admin123!');
      console.log('👤 Role: ADMIN');
    } else {
      console.error('❌ Error creating admin:', data.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

createAdmin();
