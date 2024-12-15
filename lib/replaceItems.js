

export function replaceItems(array, c1, n1, c2, n2, c3, n3) {
    let arr = [...array];

    let index = arr.indexOf(c1);
    arr[index] = n1;

    let index2 = arr.indexOf(c2);
    arr[index2] = n2;

    return arr;
}