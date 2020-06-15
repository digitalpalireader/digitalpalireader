# Steps to Convert Files to Modules

1. At the homepage,  open console window and run `copy(getFuncList())` on the console window and paste it into cleared `tools/migration/funcInfo.json`.

2. `cd` into `tools/migration/` folder and run `python3 mapper.py`.

3. Once the script finishes execution, edit parameter values `beginningIndex` and `endIndex` in `modifier.py` to choose the range of files in `functionsToExposeForFile.json` that need to be converted to modules. Run `python3 modifier.py`.

4. Check modifications in each file with function declarations (filenames printed to the terminal).

5. Add newly added modules to whitelist.

# Under the Hood

1. `getFuncList` in `digitalpalireader/_dprhtml/index.html`
   <br/> Input(s): Object.keys(Window)
   <br/> Output(s): Sorted List Of global functions and the first line of their declarations

2. `findDeclrandCalls` at `digitalpalireader/tools/migration/mapper.py`
    <br/> Input(s): files in `../../_dprhtml`
    <br/> Output(s): allFunctionCallSites, funcDeclLocations

3. `filterFuncs` at `digitalpalireader/tools/migration/mapper.py`
    <br/> Input(s): list of all function call sites, list of all function declaration sites
    <br/> Output(s): list of all call sites and list of declaration sites of functions that are called atleast once

4. `removeDeclSiteFromCallSite` at `digitalpalireader/tools/migration/mapper.py`
    <br/> Input(s): filtered list of call sites, filtered list of declaration sites of functions
    <br/> Output(s): call sites with declaration sites removed

5. `writeToFiles` at `digitalpalireader/tools/migration/mapper.py`
    <br/> Input(s): call sites, declaration sites
    <br/> Output(s): functionsToExposeForFile.json and callsAndDecls.json

6. `exposeFiles` at `digitalpalireader/tools/migration/modifier.py`
   <br/> Input(s): fileName of dataFile ie functionsToExposeForFile.json, range of files to be converted to modules
    <br/> Output(s): files to be converted to module appended with snippet and instances of functions declared in the file prefixed with moduleName
