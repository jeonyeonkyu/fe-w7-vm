function zip(arr1, arr2) {
    const result = [];
    arr1.forEach((el, idx) => {
        result.push([el, arr2[idx]]);
    })
    return result;
}
export default zip;































