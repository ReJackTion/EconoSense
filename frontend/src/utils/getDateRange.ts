export const getDateRange = (): string[] => {
    const currentMonth = new Date().getMonth();
    const curentYear = new Date().getFullYear();
    let dateRange = []

    for(let month = currentMonth; month >= 1; month--){
        let temp = `${curentYear}-${String(month).padStart(2, '0')}-01`
        dateRange.push(temp)
    }
    for(let year = curentYear-1; year >= 1941; year--){
        for(let month = 12; month >= 1; month--){
            let temp = `${year}-${String(month).padStart(2, '0')}-01`
            dateRange.push(temp)
        }
    }

    return dateRange
}