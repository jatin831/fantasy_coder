import os 
from db_query5 import *
from codechecker import *

def userSolvedProblem(code,lang, problem_id):
	source_code=code#data['source_code'] 
	language = lang#data['language']
	file = "Main.json"
	#converting source code of user to respective text files
	if language=="python":
		new_file = file.split('.')[0]+".py"
	elif language=="java":
		new_file = file.split('.')[0]+".java"
	elif language=="c":
		new_file = file.split('.')[0]+".c"
	elif language=="cpp":
		new_file = file.split('.')[0]+".cpp"
	with open(new_file, "w") as nf:
		nf.write(code)
    
    #coverting input output data into temporary text file 
	code,res=allTestcase(problem_id)
	if code==200:
		count = 1
		verdict = None
		for test in res:
			print("testcase ", count)
			inputf=test["input"]
			outputf=test["output"]
			
			try:
				with open("input.txt", "w") as inp:
					inp.write(inputf)
				with open("output.txt", "w") as out:
					out.write(outputf)
				verdict = codechecker(
				    filename=new_file,
				    inputfile="input.txt",
				    expectedoutput="output.txt",
				    timeout=5,
				    check=True
				    )
				if verdict[0] == 400:
					err_comment = "WA"
						
					d = { 'problem_id':problem_id, 'verdict':(400, err_comment)}
					print(d)
					break
				elif verdict[0]==401 or verdict[0]==402:
					with open("error.txt", "r") as err:
						err_comment = err.read()
						
					d = {'problem_id':problem_id, 'verdict':(verdict[0], err_comment)}
					print(d)
					break
				elif verdict[0]==408:
					d = { 'problem_id':problem_id, 'verdict':verdict}
					print(d)
					break
				else:
					d = { 'problem_id':problem_id, 'verdict':verdict}
					print(d)
				
				
			except Exception as e:
				print("except",e)
				return 420, "try after some time"
			#closing temporary files
			finally:
				if os.path.isfile("input.txt"):
					os.remove("input.txt")
				if os.path.isfile("output.txt"):
					os.remove("output.txt")
				if os.path.isfile("calculatedoutput.txt"):
					os.remove("calculatedoutput.txt")
				

			count += 1
			print("**************************************************************************")
		if language == "c" or language == "cpp":
			if os.path.isfile("a.exe"):
				os.remove("a.exe")
		elif language == "java":
			if os.path.isfile("Main.class"):
				os.remove("Main.class")
		if os.path.isfile(new_file):
			os.remove(new_file)
		return d['verdict'][0], d['verdict'][1]
	else:
		print(res)
		return 420, "some error"



if __name__ == "__main__":
	try:
		code, status = userSolvedProblem("test1", "1")
		print(code, status)
	except:
		print("err")


	
	

