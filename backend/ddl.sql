create extension if not exists pgcrypto;

create table users (
	username		varchar(50),
	rating			numeric(2, 1)	not null,
	password		varchar			not null,
	profile_photo 	bytea,
	email_id		varchar(50)		not null,
	phone_no		char(10)		not null,
	u_coins			int				not null,
	fname			varchar(100)	not null,
	lname			varchar(100)	not null,
	gender			varchar(10)	,
	address			varchar(256),
	inst_name		varchar(256),
	date_of_joining timestamp default current_timestamp,
	
	primary key (username)
);

create table product (
	product_id		char(10),
	product_name	varchar(50)		not null,
	price			numeric(6,2)	not null,
	front_image		bytea,
	back_image		bytea,
	pdesc			text,

	primary key (product_id)
);

create table contest (
	contest_id		char(7),
	contest_name 	varchar(100) not null,
	start_time		timestamp		not null,
	end_time		timestamp		not null,

	primary key (contest_id)
);

create table problem (
	contest_id			char(7)		unique,
	problem_id			char(7)		unique,
	problem_title		varchar(100)	not null,
	difficulty_level	int 		not null,
	coins 				int 		not null,
	prob_desc			text,

	primary key (contest_id, problem_id),
	foreign key (contest_id) references contest (contest_id)
);

create table category (
	tag		varchar(50),

	primary key (tag)
);

create table testcase (
	problem_id		char(7)		unique,
	testcase_id		char(7)		unique,
	input			text		not null,
	output			text		not null,
	is_hidden		boolean		not null,

	primary key (problem_id, testcase_id),
	foreign key (problem_id) references problem (problem_id)
);

create table buys (
	product_id			char(10),
	date_of_purchase	timestamp default current_timestamp 	not null,
	username 			varchar(50),
	quantity			int,
	order_id			varchar not null,
	price 				numeric(6,2) not null,
	contact_person 		varchar(100) not null,
	phone_number		char(10) not null,
	delivery_address	varchar(256) not null,
	shipping_id			text,
	shipping_mode		text default 'Indian post',

	primary key (product_id, date_of_purchase, username),
	foreign key (product_id) references product (product_id),
	foreign key (username) references users (username)
);

create table participate (
	username 		varchar(50),
	contest_id 		char(7),
	contest_rating	numeric(2,1)	not null,
	rank			int 			not null,

	primary key (username, contest_id),
	foreign key (username) references users (username),
	foreign key (contest_id) references contest (contest_id)
);

create table solve (
	username 		varchar(50),
	problem_id 		char(7)			unique,
	date_time		timestamp 			not null,
	verdict			varchar(5)		not null,

	primary key (username, problem_id, date_time),
	foreign key (username) references users (username),
	foreign key (problem_id) references problem (problem_id)
);

create table belongs (
	problem_id 		char(7)		unique,
	tag 			varchar(50),

	primary key (problem_id, tag),
	foreign key (problem_id) references problem (problem_id),
	foreign key (tag) references category (tag)
);

