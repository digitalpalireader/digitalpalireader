import json
import os
import os.path
import re
from pathlib import Path
import functools

"""
TODO
1. Fix up cnd0 vs cnd1
2. Sort console output
3. Sort Called (e.g "conjugate")
4. What is leftFunc.pop
5. Name better
6. Use descriptive function/variable names instead of comments
7. Eye on continued correctness

Optional:
1. Write 'pure' 'complete' functions
2. Think deterministic code
   1. 0 global variables
   2. Think data transformations instead of imperative code. i.e. Use map/reduce/filter rather than for/while and other imperative constructs

"""

listOfmatches = {}
funcToFile = {}
funcXfileDeclr = {}
expByFile = {}

leftFunc = functools.reduce(lambda acc,e : acc.update({e["name"]: e["declLine1"]}) or acc, json.load(open("funcInfo.json")), {})

for i in leftFunc:
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
    for i in leftFunc:
        y = re.match(r'.*\b'+re.escape(i)+r'\b', line)
        if(y):
            print(i+" called at line:"+str(lnNo))
            if(funcToFile[i].get(fileName) is None):
                funcToFile[i][fileName] = []
            funcToFile[i][fileName].append((lnNo))

listOfFunc2Exp = {}
funcXFile = {}


def findDeclrandCalls():
    for dirpath, dirnames, filenames in os.walk(Path("../../_dprhtml")):
        if('external' not in dirpath.split(os.path.sep)):
            for filename in [f for f in filenames if f.split(".")[-1] in ["html", "js"]]:
                fileName = (os.path.join(dirpath, filename))
                findInfile(fileName)


def findInfile(fileName):
    print(fileName)
    print("__________________\n")
    for i, line in enumerate(open(fileName, encoding="utf8"), 1):
        searchDeclr(line, fileName, i)  # step 2
        searchCall(line, fileName, i)  # step 3
    print("__________________\n")


findDeclrandCalls()

# step4

listOfFunc2Exp = [a for a in funcToFile if len(funcToFile[a]) > 1]

DeclareSites = {a: b for (a, b) in funcXfileDeclr.items()
               if a in listOfFunc2Exp}
CallSites = {a: b for (a, b) in funcToFile.items()
              if a in listOfFunc2Exp}

for i in CallSites:  # step5
    CallSites[i].pop(DeclareSites[i].split(":")[0], None)

finFile = {}
for i in CallSites:
    finFile[i] = {}
    finFile[i]["Declared"] = DeclareSites[i]
    finFile[i]["Called"] = CallSites[i]

with open("callsAndDecls.json", "w", encoding="utf8") as f:
    json.dump(finFile, f)
