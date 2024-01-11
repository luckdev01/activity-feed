const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function generateSaltAndHash(password) {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
  } catch (error) {
    console.error('Error generating salt and hash:', error);
    throw error;
  }
}

function generateSecretKey(bytes) {
  return crypto.randomBytes(bytes).toString('hex');
}

module.exports = { generateSaltAndHash, generateSecretKey };
