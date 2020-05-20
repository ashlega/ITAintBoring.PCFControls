function New-PCFControlVersion($manifestFilePath){
    # Read in XML file
    $xml = [xml](Get-Content $manifestFilePath)
    
    # Get current control version
    $controlVersion = [version]$xml.SelectSingleNode("/manifest/control").version
    
    # Build the new control version (increment build number only)
    $newControlVersion = "{0}.{1}.{2}" -f $controlVersion.Major, $controlVersion.Minor, ($controlVersion.Build + 1)
    
    # Set the new control version
    $xml.SelectSingleNode("/manifest/control").version = $newControlVersion

    # Save the updated XML
    $xml.Save($manifestFilePath)
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
$manifestFilePath = "..\IFrameControl\IFrameControl\ControlManifest.Input.xml"
New-PCFControlVersion $manifestFilePath
$manifestFilePath = "..\ExternalValidator\ExternalValidator\ControlManifest.Input.xml"
New-PCFControlVersion $manifestFilePath

#version number has been updated

pac.exe solution init --publisherName "itaintboring" --customizationPrefix "ita_"
pac.exe solution add-reference --path ..\ValidatedInputControl
pac.exe solution add-reference --path ..\CheckBoxList
pac.exe solution add-reference --path ..\TreeRelationships
pac.exe solution add-reference --path ..\NToNMultiSelect
pac.exe solution add-reference --path ..\IFrameControl
pac.exe solution add-reference --path ..\ExternalValidator



& $msBuildExe /t:restore
& $msBuildExe

cd ..\Deployment

Copy-Item "..\$($solutionFolder)\bin\Debug\$($solutionFolder).zip" .\Solutions

#ready




