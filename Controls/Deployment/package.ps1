.\Settings.ps1 -SolutionOnly

cd ..

if((Test-Path -Path "C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\msbuild.exe") -eq $True)
{
  $msBuildExe = 'C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\msbuild.exe'
}
if((Test-Path -Path "C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\msbuild.exe") -eq $True)
{
  $msBuildExe = 'C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\msbuild.exe'
}
if((Test-Path -Path "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\msbuild.exe") -eq $True)
{
  $msBuildExe = 'C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\msbuild.exe'
}

$solutionFolder = $global:SolutionName

if((Test-Path -Path $solutionFolder) -eq $False)
{
   New-Item "$solutionFolder" -itemtype Directory
}

cd .\"$solutionFolder"

..\..\packages\Microsoft.PowerApps.CLI.0.2.59\tools\pac.exe solution init --publisherName "ItAintBoring" --customizationPrefix "ita_"
..\..\packages\Microsoft.PowerApps.CLI.0.2.59\tools\pac.exe solution add-reference --path ..\ValidatedInputControl

& $msBuildExe /t:restore
& $msBuildExe

cd ..\Deployment

Copy-Item "..\$($solutionFolder)\bin\Debug\$($solutionFolder).zip" .\Solutions