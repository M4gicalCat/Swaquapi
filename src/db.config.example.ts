import pgPromise from 'pg-promise';

const db = pgPromise({})('postgresql://USER:PASSWORD@localhost:5432/DATABASE');

// uncomment to enable db
//export default db;
