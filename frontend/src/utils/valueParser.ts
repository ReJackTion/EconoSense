
export const valueParser = (value: number): any => {
    if (value == 0){
        return "Data not available"
    }
    else{
        return value
    }
}