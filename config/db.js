import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config(); // Load .env


const sql = neon(process.env.DATABASE_URL);

export default sql