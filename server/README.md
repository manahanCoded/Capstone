DATABSE FOR users
CREATE TABLE users(
	id serial primary key,
	email varchar(50) unique not null,
    password text not null,
	role varchar(45) not null
)

DATABSE FOR modules
CREATE TABLE module (
	id serial primary key,
	title varchar(100) UNIQUE not null,
	description text not null,
	information text not null
)

DATABSE FOR jobs
CREATE TABLE jobs(
	id serial primary key,
	publisher varchar(45),
	name varchar(45),
	phone varchar(45),
	email varchar(45),
	title varchar(100),
	applicants varchar(15),
	remote varchar(45),
	experience varchar(100),
	jobtype varchar(45),
	salary varchar(45),
	state text,
	city text,
	street text,
	description text,
	date date
)


CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    module_title TEXT,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE announcements (
	id serial primary key , 
	publisher: text not null,
	title text not null,
	description text not null,
	date date not null
)

CREATE TABLE applicants (
	id serial primary key, 
	jobId INTEGER not null,
	job_title text not null,
	fullname text not null,
	email text not null,
	application text not null,
	date date not null,
	resume text not null
)

CREATE TABLE mail (
	id serial primary key,
	admin varchar(45) not null,
	aplicant_name varchar(45) not null, 
	reply text not null,
	type varchar(45),
	date date
)