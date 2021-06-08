from flask import Flask, render_template, request, jsonify, session, redirect, make_response
import json
import re
from db_query import *
from flask_cors import CORS
from codechecker import *
from datetime import datetime
import check
from paytmchecksum import PaytmChecksum
import requests
import urllib
import config

configs = {
  'ORIGINS': [
    'http://codeium.tech',  # React
    '*',  # React
  ],

  'SECRET_KEY': 'This is a top secret'
}


WEBSITE_NAME = "WEBSTAGING"
INDUSTRY_TYPE_ID = "Retail"
BASE_URL = "https://securegw-stage.paytm.in"


app = Flask(__name__)
app.secret_key = configs['SECRET_KEY']
CORS(app, resources={ r'/*': {'origins': configs['ORIGINS']}}, supports_credentials=True)

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
	if (re.search(regex_email,user['email_id'])) and (re.search(regex_pass,user['password'])):
		if user['password'] == cpassword:
			code,msg = UserExist(user)
			if code==200:
				d1['msg']="user already registered"
				return jsonify(d1)
			else:
				code,msg=registerUser(user)
				if code==200:
					d1['msg']="registered successfully"
					session['username'] = data['username']
					return jsonify(d1)
				else:
					d2['msg']="error while registering"
					jsonify(d2)
		else:
			d2['msg']="password does not match"
			return jsonify(d2)
	else:
		return jsonify(d2)
		
	
    
@app.route('/login', methods=['post'])
def login():
	data = request.get_json()
	email_id=data['username'] if "username" in data else None 
	password=data['password'] if "password" in data else None
	if email_id==None :
		d2['msg']="email required"
		return jsonify(d2)
	elif password==None:
		d2['msg']="password required"
		return jsonify(d2)
	else:
		user = {'email_id':email_id, "password":password}
		check_status,msg=checkUser(user)
		if check_status==200:
			session['username']= data['username']
			d1['msg']="successfully logged in"
			return jsonify(d1)
		if check_status==420:
			d2['msg']="wrong credentials"
			return jsonify(d2)

@app.route('/practice')
def displayProblems():
	code,result = displayAllProblems()
	if code==200:
		d1['msg']=result
		return jsonify(d1)
	else:
		return jsonify(d2)

@app.route('/practice/<problem_id>', methods=['get'])
def problemdisplay(problem_id):
	if 'username' not in session:
		return {"status" : 415, "msg": "user not logged in"}
	code,message=problemInfoDisplay(problem_id)
	print(message)
	if code==200:
		d1['msg']=message
		return jsonify(d1)
	else:
		return jsonify(d2)

@app.route('/contest/past')
def displayPastContest():
	code, res = showPastContest()
	if code==200:
		d1['msg']=res
		return jsonify(d1)
	else:
		return jsonify(d2)

@app.route('/contest/ongoing')
def displayLiveContest():
	code, res = showLiveContest()
	if code==200:
		d1['msg']=res
		return jsonify(d1)
	else:
		return jsonify(d2)

@app.route('/contest/upcoming')
def displayUpcomingContest():
	code, res = showUpcomingContest()
	if code==200:
		d1['msg']=res
		return jsonify(d1)
	else:
		return jsonify(d2)
		
#contest registration 
@app.route('/contest/register', methods=["post"])
def registerinContest():
	if 'username' not in session:
		return {"status" : 415, "msg": "user not logged in"}
	data = request.get_json()
	#username=data['username'] if "username" in data else None 
	d={"username": session["username"], "contest_id": data['contest_id'], "contest_rating":'0',"rank":'0'}
	code,msg=registerInContest(d)
	if code==200:
		d1['msg']="user registered in contest"
		return jsonify(d1)
	else:
		d2['msg']="user not registered for contest"
		return jsonify(d2)

@app.route('/profile')
def profileupdate():
	if 'username' not in session:
		return {"status" : 415, "msg": "user not logged in"}
	data = request.get_json()
	cpassword = data['cpassword']
	user={"username" : data['username'],"email_id": data['email_id'],"password": data['password'],"phone_no" : data['phone_no'], "address" : data['address'], "inst_name" : data['inst_name'] }
	regex_email = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
	regex_pass = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"
	if (re.search(regex_email,user['email_id'])) and (re.search(regex_pass,user['password'])):
		if user['password'] == cpassword:
			code,msg= updateProfile(user)
			if code==200:
				d1['msg']="profile details updated successfully"
				return jsonify(d1)
			else:
				d2['msg']="error while updating profile"
				return jsonify(d2)
		else:
			d2['msg']="password and confirm password does not match"
			return jsonify(d2)
	else:
		d2['msg']="error in email or password"
		return jsonify(d2)

@app.route('/insertProducts')
def insertingProducts():
	data = request.get_json()
	pr={"product_id": data['product_id'],"product_name": data['product_name'],"price": data['price']}
	code, msg = insertProduct(pr)
	if code==200:
		d1['msg']="product inserted in database"
		return jsonify(d1)
	else :
		return jsonify(d2)

@app.route('/product', methods=['get'])
def displayProducts():
	code,message = displayAllProduct()
	if code==200:
		d1['msg']=message 
		return d1
	else:
		d2['msg']="product does not exists"
		return jsonify(d2)

@app.route('/product/categories', methods=['get'])
def displayProductCategories():
	code,message = productCategories()
	if code==200:
		d1['msg']=message 
		return d1
	else:
		print(message)
		d2['msg']="no categories found"
		return jsonify(d2)

@app.route('/products/<category>', methods=['get'])
def displayParticularProductCategory(category):
	code,message = productUnderCategory(category)
	if code==200:
		d1['msg']=message 
		return d1
	else:
		d2['msg']="no categories found"
		return jsonify(d2)


@app.route('/product/<product_id>', methods=['get'])
def displayProductDetails(product_id):
	code,message = displayProduct(product_id)
	print(message)
	if code==200:
		d1['msg']=message 
		return d1
	else:
		d2['msg']="product does not exists"
		return jsonify(d2)

@app.route('/contest/<contest_id>/leaderboard', methods=['post'])
def displayContestLeaderboard(contest_id):
	if 'username' not in session:
		return {"status" : 415, "msg": "user not logged in"}
	data = request.get_json()
	data['contest_id'] = contest_id
	code,message = contestLeaderboard(data)
	print(message)
	if code==200:
		d1['msg']=message 
		return d1
	else:
		d2['msg']="no data present"
		return jsonify(d2)

@app.route('/logout')
def logout():
	if 'username' in session:
		session.pop('username')
	d1['msg']="cookies of username deleted"
	return jsonify(d1)

@app.route("/<problem_id>/submit", methods=["post"])
def problemSubmission(problem_id):
    # if 'username' not in session:
    #   return {"status" : 415, "msg": "user not logged in"}
    data = request.get_json()
    status, msg = check.userSolvedProblem(data["code"], data["lang"], problem_id)
    if status== 200 or status ==201 or status==400 or status == 408:
        d = {"username":data["username"], "problem_id":problem_id, "verdict" : msg}
        print(d)
        st_code, message = insertingInsolve(d)
        if st_code==200:
            d1["verdict"] = msg
            return "inserted into verdict"
        else:
            print(message)
            return d2
    elif status ==402:
        d1["verdict"] = msg
        return d1
    else:
        return d2#"something occurs...try after sometime..."


@app.route("/payment", methods=["post"])
def checksum():
        #if 'username' not in session:
            #return {"status" : 415, "msg": "user not logged in"}
        data = request.get_json()
        print(data)
        #data['username'] = session['username']
        data["order_id"] ="ORD" + str(datetime.now().timestamp())
	#call insertIntoOrders
        code, msg = insertIntoOrders(data)
        if code!=200:
            d2['msg'] = msg
            return jsonify(d2)
        transaction_data = {
        "MID": config.mid,
        "WEBSITE": "WEBSTAGING",
        "INDUSTRY_TYPE_ID": "Retail",
        "ORDER_ID": data["order_id"],
        "CUST_ID": "007",
        "TXN_AMOUNT": str(data['total_price']),
        "CHANNEL_ID": "WEB",
        "MOBILE_NO": "7777777777",
        "EMAIL": "example@paytm.com",
        "CALLBACK_URL": "https://server.codeium.tech/callback"
        }
        transaction_data["CHECKSUMHASH"] = PaytmChecksum.generateSignature(transaction_data, config.mkey)
        return transaction_data

#update transaction_status on successfull payment in callback
@app.route("/callback", methods=["get", "post"])
def callback():
    callback_response = request.form.to_dict()
    if callback_response == None:
        print("--------------------------------------------------------")
        return "None is return"
    print("///////////////////////////////////////////////////////////")
    print(callback_response)
    checksum_verification_status = PaytmChecksum.verifySignature(callback_response, config.mkey,callback_response.get("CHECKSUMHASH"))
    transaction_verify_payload = {
        "MID": callback_response.get("MID"),
        "ORDERID": callback_response.get("ORDERID"),
        "CHECKSUMHASH": callback_response.get("CHECKSUMHASH")
        }
    url = BASE_URL + '/order/status'
    verification_response = requests.post(url=url, json=transaction_verify_payload)
    return redirect("https://codeium.tech")

@app.route("/contact", methods=["post"])
def contact():
	data = request.get_json()
	print(data)
	code,msg = insertIntoContact(data)
	if code==200:
                d1['msg'] = 'OK'
                return d1
	else:
		print(msg)
		return d2

@app.route("/orders", methods=["post"])
def allOrders():
	#if 'username' not in session:
	#	return {"status" : 415, "msg": "user not logged in"}
        data = request.get_json()
        code,msg = displayAllOrders(data['username'])
        if code==200:
            d1['msg'] = msg
            return d1
        else:
            return d2

@app.route("/orders/<order_id>", methods=["get"])
def order(order_id):
	#if 'username' not in session:
	#	return {"status" : 415, "msg": "user not logged in"}
	code,msg = displayOrder(order_id)
	if code==200:
		d1['msg'] = msg
		return d1
	else:
		print(msg)
		return d2


@app.route("/transaction/<order_id>", methods=["get"])
def transaction(order_id):
	if 'username' not in session:
		return {"status" : 415, "msg": "user not logged in"}
	code,msg = transactionDetails(order_id)
	if code==200:
		d1['msg'] = msg
		return d1
	else:
		print(msg)
		return d2

if __name__ == '__main__':
	app.run(host='0.0.0.0',debug=True)
	
	

		






