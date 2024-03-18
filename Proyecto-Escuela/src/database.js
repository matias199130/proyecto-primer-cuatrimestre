import {createPool} from 'mysql2/promise';
import 'dotenv/config';

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "escueladb",
});




export default pool;