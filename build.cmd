md ..\CCEditor\server
copy .\server\index.js ..\CCEditor\server
copy .\server\package.json ..\CCEditor\server
md ..\CCEditor\server\data
md ..\CCEditor\server\fonts
copy .\server\fonts\*.* ..\CCEditor\server\fonts
md ..\CCEditor\server\handlers
copy .\server\handlers\*.* ..\CCEditor\server\handlers
md ..\CCEditor\server\utils
copy .\server\utils\*.* ..\CCEditor\server\utils
md ..\CCEditor\client
md ..\CCEditor\client\dist
copy .\client\dist\index.html ..\CCEditor\client\dist
copy .\client\dist\bundle.js ..\CCEditor\client\dist
md ..\CCEditor\client\dist\images
copy .\client\dist\images\*.* ..\CCEditor\client\dist\images

