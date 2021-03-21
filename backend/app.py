from flask import Flask, render_template, request
import json
import re
from db_query import *

app = Flask(__name__)

STATUS_CODES = {
	200: 'OK',
	420: 'ERROR'
}

@app.route('/register', methods=['POST'])
def regsiter():
	#data = request.get_json()
	#username = data['username']
	#fname = data['fname']
	#lname = data['lname']
	#email_id = data['email_id']
	#password = data['password']
	#cpassword = data['cpassword']
	user={"username" : data['username'], "fname": data['fname'], "lname": data['lname'], "email_id": data['email_id'],"password": data['password']}

	regex_email = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
	#password should have at least one number
	#one uppercase and one lowercase character
	#one special symbol
	#between 8 to 20 character 

	regex_pass = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"
	if (re.search(regex_email,emailid)) and (re.search(regex_pass,password)):
		if password == cpassword:
			registerUser(user)
			return 200, 'user registered'
		else:
			return 420, 'password does not match'
	else:
		return 420, 'not registered'
    
@app.route('/login', methods=['post'])
def login():
	data = request.get_json()
	email_id = data['email_id']
	password = data['password']
	if emailid==None :
		return 420, 'email required'
	elif password==None:
		return 420, 'password required'
	else:
		user = {'emailid':emailid, "password":password}
		check_status,msg=checkUser(user)
		if check_status==200:
			return 200, 'successfuly logged in'
		if check_status==420:
			return 420, 'wrong credentials'

if __name__ == '__main__':
	code,msg=register()
	return msg
	

		






