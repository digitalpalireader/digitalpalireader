###Steps to Convert Files to Modules

1. From keys of the Window Object , get list of all DPR global functions.

2.  Get func decl sites using regex + .toString() first line OR errors . Output = `declSite:Map<funcName , (file x line)>`

3. Get call sites for each functions in the above map . Output = ` callsite:Map <funcName , (file x line)>`

4. From `callsite:Map` leave out values of key that are declr lines . Output = `callsite:Map <funcName , (file x line)> `

5. Create `Func2Exp4File:Map<filename:(funcObject)>` (contains functions to expose by file and every calledsite of each function).

6. Get files from `Func2Exp4File:Map<filename:(funcObject)>` → For each file , add the ` var modname = (function return {...})()` , get callSite for each funcName and for each , replace with DPR_filename_mod.funcName.

7. Check Modification in declared file.

8. Add DPR_filename_mod to whitelist for each file modified.
