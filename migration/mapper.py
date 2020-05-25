import json
import os
import os.path
import re
z = {}
listOfmatches = {}
funcToFile = {}
funcXfileDeclr = {}
expByFile = {}

with open("x.json") as x:
  presentDict = json.load(x)
funcList = presentDict["functions"]
declList = presentDict["declrLine1"]

while len(funcList):
    z[funcList.pop()] = declList.pop()
leftFunc = dict(z)

for i in z:
    funcToFile[i] = {}


def searchDeclr(line, fileName, lnNo):
    for i in leftFunc:
        x = re.match(r'.*'+re.escape(leftFunc[i]), line)
        if(x):
            print(i+" declared at line:"+str(lnNo))
            funcXfileDeclr[i] = fileName+":"+str(lnNo)
            leftFunc.pop(i)
            break


def searchCall(line, fileName, lnNo):
    for i in z:
        y = re.match(r'.*\b'+re.escape(i)+r'\b', line)
        if(y):
            print(i+" called at line:"+str(lnNo))
            if(funcToFile[i].get(fileName) is None):
                funcToFile[i][fileName] = []
            funcToFile[i][fileName].append((lnNo))

listOfFunc2Exp = {}
funcXFile = {}


def findDeclrandCalls():
    for dirpath, dirnames, filenames in os.walk("../_dprhtml"):
        if('external' not in dirpath.split('/')):
            for filename in [f for f in filenames if f.split(".")[-1] in ["html", "js"]]:
                fileName = (os.path.join(dirpath, filename))
                findInfile(fileName)


def findInfile(fileName):
    print(fileName)
    print("__________________\n")
    for i, line in enumerate(open(fileName), 1):
        searchDeclr(line, fileName, i)  # step 2
        searchCall(line, fileName, i)  # step 3
    print("__________________\n")


findDeclrandCalls()

# step4

listOfFunc2Exp = [a for a in funcToFile if len(funcToFile[a]) > 1]

DeclareVars = {a: b for (a, b) in funcXfileDeclr.items()
               if a in listOfFunc2Exp}  # DeclareSites
ChangeVars = {a: b for (a, b) in funcToFile.items()
              if a in listOfFunc2Exp}  # CallSites

for i in ChangeVars:  # step5
    ChangeVars[i].pop(DeclareVars[i].split(":")[0], None)

finFile = {}
for i in ChangeVars:
    finFile[i] = {}
    finFile[i]["Declared"] = DeclareVars[i]
    finFile[i]["Called"] = ChangeVars[i]

with open("calls&Declr.json", "w") as f:
    json.dump(finFile, f)
