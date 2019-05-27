$controlName = Read-Host -Prompt 'Input control name'
cd $controlName
npm run build
cd ..