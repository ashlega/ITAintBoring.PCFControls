function New-PCFControlVersion($manifestFilePath){
    $pattern = 'version="(\d+\.)?(\d+\.)?(\*|\d+)" display-name-key'

	$V = Select-String -Path $manifestFilePath -Pattern $pattern
	$currentVersion = [int]$V.Matches[0].Groups[3].Value
	$nextVersion =  [int]$V.Matches[0].Groups[3].Value + 1

	$fileContent = Get-Content $manifestFilePath
	$fileContent = $fileContent.replace("$currentVersion`"",  "$nextVersion`"") 
	Set-Content -Path $manifestFilePath -value $fileContent
}


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

#update version number

$manifestFilePath = "..\ValidatedInputControl\ValidatedInputControl\ControlManifest.Input.xml"
New-PCFControlVersion $manifestFilePath
$manifestFilePath = "..\CheckBoxList\CheckBoxList\ControlManifest.Input.xml"
New-PCFControlVersion $manifestFilePath
$manifestFilePath = "..\TreeRelationships\TreeRelationships\ControlManifest.Input.xml"
New-PCFControlVersion $manifestFilePath
$manifestFilePath = "..\NToNMultiSelect\NToNMultiSelect\ControlManifest.Input.xml"
New-PCFControlVersion $manifestFilePath

#version number has been updated

#build and package"
pac.exe solution init --publisherName "itaintboring" --customizationPrefix "ita_"
pac.exe solution add-reference --path ..\ValidatedInputControl
pac.exe solution add-reference --path ..\CheckBoxList
pac.exe solution add-reference --path ..\TreeRelationships
pac.exe solution add-reference --path ..\NToNMultiSelect

& $msBuildExe /t:restore
& $msBuildExe

cd ..\Deployment

Copy-Item "..\$($solutionFolder)\bin\Debug\$($solutionFolder).zip" .\Solutions

#ready




