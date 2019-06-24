loader.ps1

$targetSolutionExists = Get-CDSSolutionExists($global:SolutionName)
			
Push-CDSSolution $global:SolutionName #-Managed

write-host "Import finished!"

#Wait for key down
#$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');



