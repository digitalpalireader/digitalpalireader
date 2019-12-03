[![Build Status](https://parthopdas.visualstudio.com/Digital%20Pali%20Reader/_apis/build/status/Digital%20Pali%20Reader%20CI?branchName=master)](https://parthopdas.visualstudio.com/Digital%20Pali%20Reader/_build/latest?definitionId=8&branchName=master) [![Build Status](https://parthopdas.vsrm.visualstudio.com/_apis/public/Release/badge/ab038a3a-b01d-4262-9ab9-32d04d00989a/1/2)](https://parthopdas.visualstudio.com/Digital%20Pali%20Reader/_release)

# Digital Pali Reader

The Digital Pali Reader (DPR) is a tool much like a hard-copy language reader, facilitating study of the Pali language at an advanced level. Rather than offering a translation for the text being read, a reader usually includes a dictionary with all of the difficult words found in the reader.

## Build and test instructions

### PaleMoon/Waterfox extension

Each set is in its own subfolder, and each set has a build.sh script that will create the xpi for use with PaleMoon/Waterfox.  Better than this, though, is to simply create a link to the set directory in your PaleMoon/Waterfox profile's "extensions" directory.  

To do this, create a file for the set, named:

> &lt;directory&gt;@noah.yuttadhammo
> 
> with the location of the directory as the first and only line of the file, i.e.:
> 
> /path/to/directory
> 
> For example, create a file in your profile's "extensions" directory called:
> 
> digitalpalireader@noah.yuttadhammo
> 
> and put the following in it:
> 
> /path/to/digitalpalireader
> 
> (replacing "/path/to" with the actual path of the digitalpalireader directory on your machine).

Do this for each extension and then restart browser.

### DPR Web

To get DRP web running on the local machine:

> Install live-server: `npm i live-server -g`
> 
> Run live-server in root folder: `live-server`
> 
> Browse to `http://localhost:8080`

## Useful links

- Work items & Execution: [v5 Release](https://github.com/yuttadhammo/digitalpalireader/projects/1).
- Pipeline: [Build](https://yuttadhammo.visualstudio.com/digitalpalireader/_build), [Deployment](https://yuttadhammo.visualstudio.com/digitalpalireader/_release).
- Deployments: [Staging](https://dprstaging.z24.web.core.windows.net/), [Production](https://dprproduction.z13.web.core.windows.net/).
- Telemetry: [Staging](https://portal.azure.com/#@parthopdaslive.onmicrosoft.com/resource/subscriptions/dc9c3151-f906-4b6a-b7d3-040337cbcc79/resourceGroups/sirimangalo-staging/providers/microsoft.insights/components/sirimangalo-staging/sessions), [Production](https://portal.azure.com/#@parthopdaslive.onmicrosoft.com/resource/subscriptions/dc9c3151-f906-4b6a-b7d3-040337cbcc79/resourceGroups/sirimangalo-production/providers/microsoft.insights/components/sirimangalo-production/sessions).
