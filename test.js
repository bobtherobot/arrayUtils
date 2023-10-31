var list = [
    "b",
    "c",
    "D",
    "A",
    "abc",
    "#z1.doc",
    "z2.doc",
    "z3.doc",
    "z10.doc",
    "0z23.3.doc",
    "00.0z1.doc",
    "000z2.doc",
    "some/path/to/001a.doc",
    "some/path/to/001.doc",
    "some/path/003.doc",
    "some/path/002.doc",
    "z23..doc",
    "z23.2.doc",
    "z17.doc",
    "z23.doc",
    ".z43.doc",
    "z232.doc",
    "z231234567894561234600000000000000000.doc",
    "-103",
    100,
    400,
    30,
    2,
    80,
    0.80,
    1,
    102,
    -102,
    102.01,
    103.102,
    103.101,
    103.0,
    404,
    3,
    7,
    40,
    82,
    33
];
console.log("------------------------ ");
console.log("naturalCompare 1");
console.log("------------------------ ");

list.sort(naturalCompare);
for(var i=0; i<list.length; i++){
    console.log(list[i]);
}

console.log("------------------------ ");
console.log("naturalCompare 2");
console.log("------------------------ ");

var list2 = [
    'a000a.html',
    'a000.html',
    'a00a.html',
    'a000b.html',
    'a0',
    'a00',
    'a000',
    'a00.html',
    'a0001a.html',
    'a001a.html',
    'a1a.html',
    'a000000000'
];
list2.sort(naturalCompare);
for(var i=0; i<list2.length; i++){
    console.log(list2[i]);
}


console.log("------------------------ ");
console.log("naturalCompare 3");
console.log("------------------------ ");

var list2 = [
    'a111a.html',
    'a111.html',
    'a11a.html',
    'a111b.html',
    'a1',
    'a1',
    'a111',
    'a11.html',
    'a1112a.html',
    'a112a.html',
    'a2a.html',
    'a111111111'
];
list2.sort(naturalCompare);
for(var i=0; i<list2.length; i++){
    console.log(list2[i]);
}

var arr1 = [1.001, 1.002, 1.010, 1.02, 1.1, 1.3];
var arr2 = [-1.001, -1.002, -1.010, -1.02, -1.1, -1.3];
var arr3 = [0.001, 0.002, 0.010, 0.02, 0.1, 0.3];
var arr4 = [-0.001, -0.002, -0.010, -0.02, -0.1, -0.3];

console.log("------------------------ ");
console.log("arr1");
console.log("------------------------ ");
arr1.sort(naturalCompare);
for(var i=0; i<arr1.length; i++){
    console.log(arr1[i]);
}

console.log("------------------------ ");
console.log("arr2");
console.log("------------------------ ");
arr2.sort(naturalCompare);
for(var i=0; i<arr2.length; i++){
    console.log(arr2[i]);
}

console.log("------------------------ ");
console.log("arr3");
console.log("------------------------ ");
arr3.sort(naturalCompare);
for(var i=0; i<arr3.length; i++){
    console.log(arr3[i]);
}

console.log("------------------------ ");
console.log("arr4");
console.log("------------------------ ");
arr4.sort(naturalCompare);
for(var i=0; i<arr4.length; i++){
    console.log(arr4[i]);
}