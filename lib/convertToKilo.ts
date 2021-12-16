export default function (number: number){
   return  (number>900? Math.round(number/ 1000).toFixed(1)+" k":number ?? 0);
}