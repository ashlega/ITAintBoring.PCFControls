..\..\loader.ps1

#Export solution
Get-CDSSolution $global:SolutionName #-Managed

#Export schema
#$entityNames = @("ita_deployedentity", "businessunit")
#Get-CDSSchema $entityNames "Data\schema.txt"

#Export data

write-host "Done!"

#Wait for key down
#$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

