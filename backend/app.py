from flask import Flask, render_template, requests
import re
import db_query

app = Flask(__name__)

STATUS_CODES = {
	200: 'OK',
	420: 'ERROR'
}

@app.route('/register', methods=['POST'])
def regsiter():
	username = requests.form.get('username')
	fname = requests.form.get('fname')
	lname = requests.form.get('lname')
	email_id = requests.form.get('email_id')
	password = request.form.get('password')
	cpassword = request.form.get('cpassword')

	regex_email = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
	#password should have at least one number
	#one uppercase and one lowercase character
	#one special symbol
	#between 8 to 20 character 

	regex_pass = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"
	if (re.search(regex_email,emailid)) and (re.search(regex_pass,password)):
		if password == cpassword:
			resp = make_response(redirect('/'))
			resp.set_cookie("username",username)
			return resp
		else:
			return 420, 'password does not match'
	else:
		return 420, 'not registered'
    
@app.route('/login', methods=['post'])
def login():
	emailid = request.form.get('emailid')
	password = request.form.get('password')
	if emailid==None or password==None:
		return render_template('login.html')
	else:
		user = {'emailid':emailid, "password":password}
		check_status,msg=checkUser(user)
		if check_status==200:
			resp = make_response(redirect("/"))
			resp.set_cookie("username",username)
			return resp
		if check_status==420:
			return 400, 'wrong credentials'

		






