$controlName = Read-Host -Prompt 'Input control name'
New-Item $controlName -ItemType directory
cd $controlName
..\..\packages\Microsoft.PowerApps.CLI.0.2.59\tools\pac.exe pcf init --namespace ItAintBoring.PCFControls --name $controlName --template field
npm install
cd ..