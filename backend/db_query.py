import psycopg2
import json

def connect():
	try:
		connection = psycopg2.connect(user="postgres",
			dbname="project",
			password="shreya12",
			host="127.0.0.1",
			port="5432")
		return 200, connection
	except:
		return 420, "connection error"

#adding details to database

def registerUser(user):
	print("enter")
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Coneection error"
		cursor = connection.cursor()
		cursor.execute("INSERT INTO users (username,fname,lname,email_id,password) Values (%s,%s,%s,%s,crypt(%s,gen_salt('bf')))", (user['username'],user['fname'],user['lname'],user['email_id'],user['password']))
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, "OK"
	except (Exception, psycopg2.Error) as error:
		return 420, error

def checkUser(user):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Coneection error"
		cursor = connection.cursor()
		cursor.execute("SELECT username,email_id,password FROM users WHERE (email_id=%s OR username=%s) AND password=crypt(%s, password)",(user['email_id'],user['email_id'],user['password']))
		record = cursor.fetchall()
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "empty"
		return 200, record[0]
	except (Exception, psycopg2.Error) as error:
		return 420, error

def UserExist(user):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Coneection error"
		cursor = connection.cursor()
		cursor.execute("SELECT username,email_id FROM users WHERE email_id=%s OR username=%s ",(user['email_id'],user['username']))
		record = cursor.fetchall()
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "empty"
		return 200, record[0]
	except (Exception, psycopg2.Error) as error:
		return 420, error

if __name__=="__main__":
	print("connected")
	usr = {"username" : "xyr", "fname": "xyz", "lname": "hyt", "email_id":"wvsdtf@gmail.com","password":"ajhw45"}
	code,res=registerUser(usr)
	print(code,res)


