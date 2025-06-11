-- Initialize FlowTune Database
CREATE DATABASE flowtune_db;
CREATE USER flowtune_user WITH PASSWORD 'flowtune_password';
GRANT ALL PRIVILEGES ON DATABASE flowtune_db TO flowtune_user;

-- Set up extensions
\c flowtune_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO flowtune_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flowtune_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO flowtune_user; 