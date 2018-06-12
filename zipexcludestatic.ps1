$date = Get-Date -format "yyMMdd"
7z a -tzip mathvisualized-${date}.zip * -mx0 -xr!static -xr!dbdumps -xr!.git -xr!.vscode