import bcrypt from "bcryptjs";

// Generate bcrypt hash
const generateHash = async (input, saltRounds = 10) => {
  try {
    const hash = await bcrypt.hash(input, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error in hash generation:", error);
    throw new Error("Hash generation failed");
  }
};

// Compare a plain text input with a bcrypt hashed value
const compareHash = async (input, hash) => {
  try {
    return await bcrypt.compare(input, hash);
  } catch (error) {
    console.error("Error in hash comparison:", error);
    throw new Error("Hash comparison failed");
  }
};

// Generate a salt value
const generateSalt = async (saltRounds = 10) => {
  try {
    return await bcrypt.genSalt(saltRounds);
  } catch (error) {
    console.error("Error in salt generation:", error);
    throw new Error("Salt generation failed");
  }
};

export { generateHash, compareHash, generateSalt };
