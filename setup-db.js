const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL);

const migration = require('fs').readFileSync('./migrations/0000_adorable_celestials.sql', 'utf8');

sql.unsafe(migration)
  .then(() => {
    console.log('✅ Database setup complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Database setup failed:', err.message);
    process.exit(1);
  });
