export const transformRisk = (id: string, risk: number): string => {

    var realRisk: number

    switch (id) {
        case 'inflation_growth_rate':
          realRisk = 100 - risk;
          break;
        case 'unemployment_rate':
          realRisk = 100 - risk;
          break;
        default:
          realRisk = risk;
          break;
      }
      return (realRisk / 100).toFixed(2)
}

export const checkHealth = (id:string, risk:number): string => {
    if(id=="inflation_growth_rate" || id=="unemployment_rate"){
        if(risk>70){
            return "Bad"
        }else if(risk<30){
            return "Good"
        }
        else{
            return "Neutral"
        }
    }else{
        if(risk>70){
            return "Good"
        }else if(risk<30){
            return "Bad"
        }
        else{
            return "Neutral"
        }
    }
    
}