function pagination(cars, page, count) {
    const endInd = count * page - 1; 
    const startInd = endInd - count + 1;
    return(cars.slice(startInd, endInd + 1));
}

export default pagination;