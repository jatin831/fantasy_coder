from flask import Flask, render_template, request
import json
import re
from db_query import *

app = Flask(__name__)

d1={"status":200, "msg":"OK"}
d2={"status":420, "msg":"ERROR"}

@app.route('/register', methods=['POST'])
def regsiter():
	data = request.get_json()
	#username = data['username']
	#fname = data['fname']
	#lname = data['lname']
	#email_id = data['email_id']
	#password = data['password']
	cpassword = data['cpassword']
	user={"username" : data['username'], "fname": data['fname'], "lname": data['lname'], "email_id": data['email_id'],"password": data['password']}

	regex_email = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
	#password should have at least one number
	#one uppercase and one lowercase character
	#one special symbol
	#between 8 to 20 character 

	regex_pass = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"
	code,msg = UserExist(user)
	if code==200:
		print("user already registered")
	else:
		if (re.search(regex_email,user['email_id'])) and (re.search(regex_pass,user['password'])):
		    if user['password'] == cpassword:
			    registerUser(user)
			    d1['msg']="registered successfully"
			    return jsonify(d1)
		    else:
			    d2['msg']="password does not match"
			    return jsonify(d2)
	    else:
		    return jsonify(d2)
	
    
@app.route('/login', methods=['post'])
def login():
	data = request.get_json()
	data['email_id'] if "email_id" in data else None 
	data['password'] if "password" in data else None
	if email_id==None :
		d2['msg']="email required"
		return jsonify(d2)
	elif password==None:
		d2['msg']="password required"
		return jsonify(d2)
	else:
		user = {'emailid':emailid, "password":password}
		check_status,msg=checkUser(user)
		if check_status==200:
			d1['msg']="successfully logged in"
			return jsonify(d1)
		if check_status==420:
			d2['msg']="wrong credentials"
			return jsonify(d2)

if __name__ == '__main__':
	app.run(debug=True)
	res=register()
	print(res)
	
	

		






