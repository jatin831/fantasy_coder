import psycopg2
import json

#adding details to database
def registerUser(user):
	print("enter")
	try:
		connection = psycopg2.connect(user="postgres",
			dbname="project",
			password="shreya12",
			host="127.0.0.1",
			port="5432")
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
		connection = psycopg2.connect(user="postgres",
			dbname="project",
			password="shreya12",
			host="127.0.0.1",
			port="5432")
		cursor = connection.cursor()
		cursor.execute("SELECT username,email_id,password FROM users WHERE email_id=%s AND password=%s",(user['email_id'],user['password']))
		record = cursor.fetchall()
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 404, "empty"
		return 200, record[0]
	except (Exception, psycopg2.Error) as error:
		return 420, error

if __name__=="__main__":
	print("connected")
	usr = {"username" : "xyr", "fname": "xyz", "lname": "hyt", "email_id":"wvsdtf@gmail.com","password":"ajhw45"}
	code,res=registerUser(usr)
	print(code,res)


