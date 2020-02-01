#$controlName = Read-Host -Prompt 'Input control name'

$controlName = "ValidatedInputControl"
cd $controlName
npm run build
cd ..

$controlName = "TreeRelationships"
cd $controlName
npm run build
cd ..

$controlName = "CheckBoxList"
cd $controlName
npm run build
cd ..

$controlName = "NtoNMultiSelect"
cd $controlName
npm run build
cd ..