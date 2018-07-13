$date = Get-Date -format "yyMMdd"
7z a -tzip mv-static-${date}.zip * -mx0 -xr!node_modules