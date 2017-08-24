var API="http://localhost/blank/api/public";
if (process.env.NODE_ENV==='production')
 API="http://kallipugos.com/API/public";

export let APIPath=API;