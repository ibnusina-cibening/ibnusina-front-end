export default function (number: number){
   const num = number === null? 0:number;
   return  (num>900? Math.round(num/ 1000).toFixed(1)+" k":num ?? 0);
}