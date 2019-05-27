$msBuildExe = 'C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\msbuild.exe'
$solutionFolder = "ItAintBoring.Controls"

if((Test-Path -Path $solutionFolder) -eq $False)
{
   New-Item "$solutionFolder" -itemtype Directory
}

cd .\"$solutionFolder"

..\..\packages\Microsoft.PowerApps.CLI.0.2.59\tools\pac.exe solution init --publisherName "ItAintBoring" --customizationPrefix "ita_"
..\..\packages\Microsoft.PowerApps.CLI.0.2.59\tools\pac.exe solution add-reference --path ..\Test1
..\..\packages\Microsoft.PowerApps.CLI.0.2.59\tools\pac.exe solution add-reference --path ..\Test2

& $msBuildExe /t:restore
& $msBuildExe

cd ..