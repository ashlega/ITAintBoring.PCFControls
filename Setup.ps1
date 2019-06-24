function Get-NuGetPackages{

	$sourceNugetExe = "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe"
	$targetNugetExe = ".\nuget.exe"
	Remove-Item .\Tools -Force -Recurse -ErrorAction Ignore
	Invoke-WebRequest $sourceNugetExe -OutFile $targetNugetExe
	Set-Alias nuget $targetNugetExe -Scope Global -Verbose

	##
	##Download CLI 
	##
	./nuget install  Microsoft.PowerApps.CLI -O .\packages
	##
	##Remove NuGet.exe
	##
	#Remove-Item nuget.exe 
}

Get-NuGetPackages