import json
import os
import os.path
import re
from pathlib import Path
import functools

listOfmatches = {}
allFunctionCallSites = {}
funcDeclLocations = {}
expByFile = {}
listOfFunc2Exp = {}
funcXFile = {}
funcsAndDeclsLeftToFind = {}
allFuncsAndDecls = {}

def loadFromFile(functionInfoFile = "funcInfo.json"):
  return functools.reduce(lambda acc, e: acc.update(
      {e["name"]: e["declLine1"]}) or acc, json.load(open(functionInfoFile)), {})

def lineContainsFuncDecl(func, line):
  return re.match(r'.*' + re.escape(funcsAndDeclsLeftToFind[func]), line)

def lineContainsFuncCall(func, line):
  return re.match(r'.*\b' + re.escape(func) + r'\b', line)

def initFuncToFileMap(listOfFuncsAndDecls):
  for func in listOfFuncsAndDecls:
      allFunctionCallSites[func] = {}

def searchDeclrinLine(line, fileName, lineNo):
    for func in funcsAndDeclsLeftToFind:
        if(lineContainsFuncDecl(func, line)):
            print(func + " declared at line:" + str(lineNo))
            funcDeclLocations[func] = fileName + ":" + str(lineNo)
            funcsAndDeclsLeftToFind.pop(func)
            break

def addToFuncCallSiteList(func, fileName, lineNo):
  if(allFunctionCallSites[func].get(fileName) is None):
    allFunctionCallSites[func][fileName] = []
  allFunctionCallSites[func][fileName].append((lineNo))

def searchCallinLine(line, fileName, lineNo):
    for func in allFuncsAndDecls:
        if(lineContainsFuncCall(func, line)):
            print(func + " called at line:" + str(lineNo))
            addToFuncCallSiteList(func, fileName, lineNo)

def findDeclrandCalls():
    for dirpath, _, filenames in os.walk(Path("../../_dprhtml")):
        if('external' not in dirpath.split(os.path.sep)):
            for filename in [f for f in filenames if f.split(".")[-1] in ["html", "js"]]:
                fileName = (os.path.join(dirpath, filename))
                findInfile(fileName)

def findInfile(fileName):
    print(fileName)
    print("__________________\n")
    for i, line in enumerate(open(fileName, encoding = "utf8"), 1):
        searchDeclrinLine(line, fileName, i)
        searchCallinLine(line, fileName, i)
    print("__________________\n")

def filterFuncs(callSites, DeclSites):
    listOfFuncToExpose = [func for func in callSites if len(callSites[func])]
    DeclareSites = {func: DeclSite for (func, DeclSite) in funcDeclLocations.items()
                    if func in listOfFuncToExpose}
    RelevantCallSites = {func: CallSiteArray for (func, CallSiteArray) in allFunctionCallSites.items()
                 if func in listOfFuncToExpose}
    return RelevantCallSites, DeclareSites

def removeDeclSiteFromCallSite(callSites, DeclSites):
    for i in callSites:
        fN, lN = DeclSites[i].split(":")
        callSites[i][fN].remove(int(lN))
    return callSites

def writeToFile(data, fileName):
  with open(fileName, "w", encoding = "utf8") as f:
          json.dump(data, f)

def writeToFiles(CallSites, DeclareSites):
    formattedDict = {}
    for func in CallSites:
        formattedDict[func] = {}
        formattedDict[func]["Declared"] = DeclareSites[func]
        formattedDict[func]["Called"] = CallSites[func]
    sortedFormattedDict = sorted(formattedDict.items(), key = lambda funcObj: len(funcObj[1]["Called"]))
    writeToFile(sortedFormattedDict, "callsAndDecls.json")
    func2Exp4File = {formattedDict[v]["Declared"].split(":")[0]: [] for v in formattedDict}
    for i in formattedDict:
        [fileName, lineNo] = formattedDict[i]["Declared"].split(":")
        func2Exp4File[fileName].append(
            {'name': i, 'Line': lineNo, 'Called@': formattedDict[i]["Called"]})
    numOfChangesForFile = {}
    for i in func2Exp4File:
        x = 0
        for j in func2Exp4File[i]:
            for k in j["Called@"]:
                x += (len(j["Called@"][k]))
        numOfChangesForFile[i] = x
    func2Exp4FileSorted = sorted(
        func2Exp4File.items(), key = lambda a: numOfChangesForFile[a[0]])
    writeToFile(func2Exp4FileSorted, "functionsToExposeForFile.json")

allFuncsAndDecls = loadFromFile("funcInfo.json")

funcsAndDeclsLeftToFind = dict(allFuncsAndDecls)

initFuncToFileMap(allFuncsAndDecls)

findDeclrandCalls()

CallSites, DeclareSites = filterFuncs(allFunctionCallSites, funcDeclLocations)

CallSites = removeDeclSiteFromCallSite(CallSites, DeclareSites)

writeToFiles(CallSites, DeclareSites)
