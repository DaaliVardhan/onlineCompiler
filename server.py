from flask import Flask,render_template,request,redirect,url_for
import requests
import json as j


app=Flask(__name__)

@app.route("/",methods=['POST','GET'])
def get():
    if request.method=="POST":
        data=request.form
        
        lang={
            "python":"python3",
            "java":"java",
            "c_cpp":"cpp17"
        }

        body={"script": data["script"],
        "stdin": data["stdin"],
        "language": lang[data["lang"]],
        "versionIndex": "0",
        "clientId": "b75ceb42f2d6440802d30b6bfb234d83",
        "clientSecret": "21966293b7bb0019a2ccef63201b7cd98ce3408cdc9d23b84341af1a73739029"
        }
        
        res=requests.post(url="https://api.jdoodle.com/v1/execute",headers={"Content-Type":"application/json"},data=j.dumps(body))
        return res.json()
        
    return render_template("index.html")


if __name__=="__main__":
    app.run()
