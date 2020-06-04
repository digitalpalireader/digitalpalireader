import json ,re
file2Exp4file = json.load(open("file2Exp4file.json"))
for DeclfileObj in file2Exp4file[0:2]:
    fModName=DeclfileObj[0].split("/")[-1].split(".")[0]
    for funcs in (DeclfileObj[1]):
        print("\nfunction - ",funcs['name'],"\n")
        for callFile,lnNo in (funcs['Called@'].items()):
            f=(open(callFile,'r+'))
            flines=(f.readlines())
            for line in lnNo:
                print(flines[line-1],"\n changed to:\n")
                flines[line-1]=(re.sub(re.escape(funcs['name']),fModName+"."+funcs['name'],flines[line-1]) )
                print(flines[line-1],"\n")
            f.seek(0)
            f.writelines(flines)
