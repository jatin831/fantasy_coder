import psycopg2
import json
import datetime 
from psycopg2.extras import RealDictCursor
import base64
import config

def connect():
	try:
		connection = psycopg2.connect(user="postgres",
			dbname="test",
			password=config.pwd,
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

def displayAllProblems():
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT * FROM problem")
		record = cursor.fetchall()
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "error"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error


def problemInfoDisplay(problem_id):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Coneection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT problem.problem_title,problem.difficulty_level,problem.coins,problem.prob_desc,testcase.testcase_id,testcase.input,testcase.output FROM problem FULL JOIN testcase ON problem.problem_id= testcase.problem_id WHERE problem.problem_id=%s and testcase.is_hidden=False",(problem_id,))
		record = cursor.fetchall()
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "problem does not exist"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error
		
def insertingInsolve(d):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor()
		now = datetime.datetime.now()
		cursor.execute("INSERT INTO solve (username,problem_id,date_time,verdict) Values (%s,%s,%s,%s)", (d['username'],d['problem_id'],now,d['verdict']))
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, "OK"
	except (Exception, psycopg2.Error) as error:
		return 420, error

def allTestcase(problem_id):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT * FROM testcase WHERE problem_id=%s",(problem_id,))
		record = cursor.fetchall()
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

def showPastContest():
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		now = datetime.datetime.now()
		cursor.execute("SELECT * FROM contest WHERE %s>end_time",(now,))
		record = cursor.fetchall()
		if len(record)==0:
			return 420, "0 records"
		for i in record:
			i["cont_image"]=str(base64.b64encode(i["cont_image"]))
		if (connection):
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error
def showLiveContest():
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		now = datetime.datetime.now()
		cursor.execute("SELECT * FROM contest WHERE %s>=start_time and %s<end_time",(now,))
		record = cursor.fetchall()
		if len(record)==0:
			return 420, "0 records"
		for i in record:
			i["cont_image"]=str(base64.b64encode(i["cont_image"]))
		if (connection):
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

		

def showUpcomingContest():
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		now = datetime.datetime.now()
		cursor.execute("SELECT * FROM contest WHERE start_time>%s",(now,))
		record = cursor.fetchall() 
		if len(record)==0: 
			return 420, "0 records"
		for i in record:
			i["cont_image"]=str(base64.b64encode(i["cont_image"]))
		if (connection):
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error
		
#inserting contest registration details in participate table
def registerInContest(d):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Coneection error"
		cursor = connection.cursor()
		cursor.execute("INSERT INTO participate (username,contest_id,contest_rating,rank) Values (%s,%s,%s,%s)", (d['username'],d['contest_id'],d['contest_rating'],d['rank']))
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, "OK"
	except (Exception, psycopg2.Error) as error:
		return 420, error

#updateing user details in database 
#check for customized update only which data is available
#if user is updating its username or email then check for existing one first
def updateProfile(user):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Coneection error"
		cursor = connection.cursor()
		cursor.execute("UPDATE users SET (username,email_id,phone_no,address,inst_name,password) Values (%s,%s,%s,%s,%s,crypt(%s,gen_salt('bf'))", (user['username'],user['email_id'],user['phone_no'],user['address'],user['inst_name'],user['password']))
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, "OK"
	except (Exception, psycopg2.Error) as error:
		return 420, error

def insertProduct(pr):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor()
		cursor.execute("INSERT INTO product (product_id,product_name,price) Values (%s,%s,%s)", (pr['product_id'],pr['product_name'],pr['price']))
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, "OK"
	except (Exception, psycopg2.Error) as error:
		return 420, error

def displayProduct(product_id):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT * FROM product WHERE product_id=%s",(product_id,))
		record = cursor.fetchall()
		for i in record:
			i['price'] = str(i['price'])
			i["front_image"]=str(base64.b64encode(i["front_image"]))
			i["back_image"]=str(base64.b64encode(i["back_image"]))
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "problem does not exist"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

def displayAllProduct():
	try:
		status, connection = connect()
		if status == 420:
			return 420, "connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT product_id,product_name,price,front_image FROM product")
		record = cursor.fetchall()
		for i in record:
			i['price'] = str(i['price'])
			i["front_image"]=str(base64.b64encode(i["front_image"]))
			#i["back_image"]=str(base64.b64encode(i["back_image"]))
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "problem does not exist"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

def productCategories():
	try:
		status, connection = connect()
		if status == 420:
			return 420, "connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT distinct(product_category) FROM product")
		record = cursor.fetchall()
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "problem does not exist"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

def productUnderCategory(category):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT * FROM product where product_category=%s",(category,))
		record = cursor.fetchall()
		for i in record:
			i['price'] = str(i['price'])
			i["front_image"]=str(base64.b64encode(i["front_image"]))
			i["back_image"]=str(base64.b64encode(i["back_image"]))
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "problem does not exist"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

def contestLeaderboard(contest_data):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		now = datetime.datetime.now()
		cursor.execute("""
		select participate.username, count(distinct problem_id), sum(solve.date_time - %s)
		from participate left join (select * from solve where solve.problem_id in (select problem_id from problem where contest_id=%s)) as solve
		on participate.username = solve.username
		where solve.verdict='AC' and participate.contest_id=%s
		group by participate.username
		order by count desc, sum asc""",(now,contest_data['contest_id'],contest_data['contest_id']))
		record = cursor.fetchall()
		for i in record:
			i['sum'] = str(i['sum'])
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "No participation"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

def insertIntoBuys(data):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor()
		print("Hello1")
		for item in data['products']:
			cursor.execute("INSERT INTO buys(product_id, quantity, order_id, size) VALUES (%s, %s, %s, %s)",(item['product_id'], item['quantity'], data['order_id'],item['size']))
		print("Hello2")
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, "OK"
	except (Exception, psycopg2.Error) as error:
		return 420, error

def insertIntoOrders(data):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		now = datetime.datetime.now()
		cursor = connection.cursor()
		print("Working till here")
		cursor.execute("""INSERT INTO orders(username, date_of_purchase, order_id, total_price, contact_person,
					contact_email, phone_number, delivery_address, coins_used)
					VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",(data['username'],now,data['order_id'],data['total_price'], data['contact_person'],
					data['contact_email'], data['phone_number'], data['delivery_address'], data['coins_used']))
		print("executes")
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		print("working")
		code, msg = insertIntoBuys(data)
		print("working")
		if code==200:
			return 200, "OK"
		else:
			return 420, msg
	except (Exception, psycopg2.Error) as error:
		return 420, error


def insertIntoContact(data):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor()
		now = datetime.datetime.now()
		cursor.execute("INSERT INTO public.contact(contact_name, email, subject, msg, timeofinsertion) VALUES (%s, %s, %s, %s, %s)",(data["name"],data["email"],data["subject"],data["message"],now))
		if (connection):
			connection.commit()
			cursor.close()
			connection.close()
			print("PostgreSQL connection is closed")
		return 200, "OK"
	except (Exception, psycopg2.Error) as error:
		return 420, error


#orderlist(username) -> orderId, orderDate, orderStatus, totalAmount for every order
def displayAllOrders(username):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT username, date_of_purchase, order_id, total_price, order_status FROM orders WHERE username=%s",(username,))
		record = cursor.fetchall()
		for i in record:
			i['total_price'] = str(i['total_price'])
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "error"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error


#ORDER DETAILS(orderId) -> orderDate, subTotal, shippingCost, tax, totalAmount, status, shipmentDate, List of products ordered, Shipment Details
def displayOrder(orderId):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT * FROM orders WHERE order_id=%s ",(orderId,))
		record = cursor.fetchall()
		for i in record:
			i['total_price'] = str(i['total_price'])
		cursor.execute("SELECT buys.product_id, quantity, size, front_image, price, quantity*price as total, product_name, product_category FROM buys inner join product on buys.product_id = product.product_id  WHERE buys.order_id=%s ",(orderId,))
		productsOrdered = cursor.fetchall()
		for item in productsOrdered:
			item['price'] = str(item['price'])
			item["front_image"]=str(base64.b64encode(item["front_image"])) if item["front_image"]!=None else None
			item["total"] = str(item["total"])
		record[0]["products"] = productsOrdered
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 200, record
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error

#TRANSACTION DETAILS status: failed, pending, success -> transaction ID, order ID, transaction Date, transaction Time, List of Products
def transactionDetails(orderId):
	try:
		status, connection = connect()
		if status == 420:
			return 420, "Connection error"
		cursor = connection.cursor(cursor_factory=RealDictCursor)
		cursor.execute("SELECT date_of_purchase ,transaction_status FROM orders WHERE order_id=%s",(orderId,))
		record = cursor.fetchall()
		if(connection):
			cursor.close()
			connection.close()
		if len(record) == 0:
			return 420, "error"
		return 200, record
	except (Exception, psycopg2.Error) as error:
		return 420, error



if __name__=="__main__":
	print("connected")
	usr = {"username" : "xyr", "fname": "xyz", "lname": "hyt", "email_id":"wvsdtf@gmail.com","password":"ajhw45"}
	code,res=registerUser(usr)
	print(code,res)


"""select rank() over (order by count(distinct problem_id) desc, sum(solve.date_time - current_timestamp) asc),participate.username, count(distinct problem_id) as c, sum(solve.date_time - current_timestamp) as s
from participate left join (select * from solve where solve.problem_id in (select problem_id from problem where contest_id='1      ')) as solve
on participate.username = solve.username
where solve.verdict='AC' and participate.contest_id='1      '
group by participate.username"""
