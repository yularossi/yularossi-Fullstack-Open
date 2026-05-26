const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/user')
const config = require('./utils/config')
const logger = require('./utils/logger')

const seedDatabase = async () => {
  try {
    logger.info('Connecting to', config.MONGODB_URI)
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')

    // Create test user
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password123', saltRounds)

    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash
    })

    // Try to save, handling if user already exists
    try {
      const savedUser = await testUser.save()
      logger.info('Test user created successfully')
      console.log('\n✓ Test user created!')
      console.log('  Username: testuser')
      console.log('  Password: password123\n')
    } catch (error) {
      if (error.code === 11000) {
        logger.info('Test user already exists')
        console.log('\n✓ Test user already exists')
        console.log('  Username: testuser')
        console.log('  Password: password123\n')
      } else {
        throw error
      }
    }

    await mongoose.connection.close()
    logger.info('Database connection closed')
  } catch (error) {
    logger.error('Error seeding database:', error.message)
    process.exit(1)
  }
}

seedDatabase()
