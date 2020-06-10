import json
import os
import os.path
import re
from pathlib import Path
import functools

listOfmatches = {}
funcToFile = {}
funcXfileDeclr = {}
expByFile = {}

leftFunc = functools.reduce(lambda acc, e: acc.update(
    {e["name"]: e["declLine1"]}) or acc, json.load(open("funcInfo.json")), {})
allFunc = dict(leftFunc)

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
    for i in allFunc:
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
    fN, lN = DeclareSites[i].split(":")
    CallSites[i][fN].remove(int(lN))

finDict = {}

for i in CallSites:
    finDict[i] = {}
    finDict[i]["Declared"] = DeclareSites[i]
    finDict[i]["Called"] = CallSites[i]

finFile = sorted(finDict.items(), key=lambda a: len(a[1]["Called"]))

with open("callsAndDecls.json", "w", encoding="utf8") as f:
    json.dump(finFile, f)

func2Exp4File = {finDict[v]["Declared"].split(":")[0]: [] for v in finDict}

for i in finDict:
    [fileN, lnNo] = finDict[i]["Declared"].split(":")
    func2Exp4File[fileN].append(
        {'name': i, 'Line': lnNo, 'Called@': finDict[i]["Called"]})

numOfChangesForFile = {}

for i in func2Exp4File:
    x = 0
    for j in func2Exp4File[i]:
        for k in j["Called@"]:
            x += (len(j["Called@"][k]))
    numOfChangesForFile[i] = x

func2Exp4FileSorted = sorted(
    func2Exp4File.items(), key=lambda a: numOfChangesForFile[a[0]])

with open("file2Exp4File.json", "w", encoding="utf8") as f:
    json.dump(func2Exp4FileSorted, f)
