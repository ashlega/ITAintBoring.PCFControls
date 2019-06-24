#Processing connections
param(
    [switch] $SolutionOnly = $false
)

if(($SolutionOnly -ne $true) -and
   ($global:SourceConnectionString -eq $null))
{
	if($env:ConnectionString -eq $null){

	  $password = Read-Host -assecurestring "Please enter your password"
	  $password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

	  $global:SourceConnectionString = "RequireNewInstance=True;AuthType=Office365;Url=https://treecatsoftwaresbx.crm3.dynamics.com;UserName=info@treecatsoftware.com;Password=$password"
	  $global:DestinationConnectionString = "RequireNewInstance=True;AuthType=Office365;Url=https://treecatsoftwaresbx.crm3.dynamics.com/;UserName=info@treecatsoftware.com;Password=$password"
	}
	else{
	  $global:SourceConnectionString = $env:ConnectionString
	  $global:DestinationConnectionString = $env:ConnectionString
	}
}

if($env:SolutionName -eq $null){
  $global:SolutionName = "ItAintBoringPCFControls"
}
else{
  $global:SolutionName = $env:SolutionName
}



