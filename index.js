// Implement a function that removes duplicates from an array without using Set.

const removeDublicates = (array) => {
    return [...new Set(array)];
}

console.log(removeDublicates([2,3,4,5,6,6,7,8,]));
