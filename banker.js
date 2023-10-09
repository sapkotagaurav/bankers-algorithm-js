

/* 
Submitted by: Gaurab Sapkota

*/

//Imports
const { log } = require('console');
var fs = require('fs')
var path = require('path')


//Initialization
let filename = process.argv[2]
let n, m, allMat = [], maxMat = [], available = []
let prodcessID, request;
let needMat = [];
var index;
var temp = "";


//Read the file and parse the text

fs.readFile(filename, (err, data) => {
    var l = data.toString();
    l = l.split('\n')
    index = find(l, 0)
    n = l[index]
    index = find(l, index + 1)
    m = l[index]
    index = find(l, index + 1)
    //allMat allocation matrix initialization
    for (let i = 0; i < n; i++) {
        allMat[i] = l[index].split().map(e => {
            return (e.split(' ').map(k => {
                return parseInt(k)
            }))
        });
        allMat[i] = allMat[i][0]
        index++;

    }
    index = find(l, index)
    //Maximum matrix initialization
    for (let i = 0; i < n; i++) {
        maxMat[i] = l[index].split().map(e => {
            return (e.split(' ').map(k => {
                return parseInt(k)
            }))
        });
        maxMat[i] = maxMat[i][0]
        index++;

    }
    //Empty need matrix
    for (let i = 0; i < n; i++) {
        needMat[i] = []

    }
    index = find(l, index)

    //Parsing the available vector
    available = l[index].split(' ').map(e => { return parseInt(e) })
    index = find(l, index + 1)

    //Process Id for request vector
    prodcessID = parseInt(l[index].split(":")[0])

    //Request vector
    request = l[index].split(":")[1].split(" ").map(e => parseInt(e))

    //Setup for process types, i.e A B C D
    for (let i = 0; i < m; i++) {
        temp += String.fromCharCode(65 + i) + " ";


    }



    //Display the resource types, number of processes, allocation matrix, maximum matrix, need matrix and available vector
    displayData(n, m, allMat, maxMat, available)

    //[...array] copys the elements to preserve the actual array
    var avail = [...available]

    //Check if the system is in safe state and print the message
    if (checkState(n, m, [...allMat], [...needMat], [...maxMat], avail)[0]) {
        console.log("THE SYSTEM IS IN SAFE STATE\n");
    } else {
        log("TTHE SYSTEM IS NOT IN SAFE STATE\n")
    }


    var avail2 = [...available]
    //Display the request vector
    displayRequestData(prodcessID, request);
    // 3 checks to allocate the request
    if (checkSmall(m, [...request], needMat[prodcessID])) {
        if (checkSmall(m, [...request], [...avail2])) {
            let a = checkrequestState(m, [...request], [...avail2], prodcessID, [...maxMat], [...allMat], [...needMat])
            if (a[0]) {
                console.log('THE REQUEST CAN BE GRANTED!\n');
                console.log(`The available vector is \n${temp}\n${a[2].join(" ")}`);
            } else {
                console.log(`THE REQUEST CANNOT BE GRANTED!`);
            }
        } else {
            console.log(`THE REQUEST CANNOT BE GRANTED!`);
        }
    }else{
        console.log(`THE REQUEST CANNOT BE GRANTED!`);
    }


})


//Display data function
function displayData(n, m, allMat, maxMat, available) {
    console.log(`There are ${n} processes in the system\n\n`);
    console.log(`There are ${m} resource types.\n\n`);


    let allMatStr = ""
    let maxMatstr = ""
    let needmatstr = ""

    for (let i = 0; i < n; i++) {
        var temp2 = ""
        var temp3 = ""
        var temp4 = ""
        for (let j = 0; j < m; j++) {
            temp2 += allMat[i][j].toString() + " "
            temp3 += maxMat[i][j].toString() + " "
            temp4 += (maxMat[i][j] - allMat[i][j]).toString() + " "
            needMat[i][j] = (maxMat[i][j] - allMat[i][j])

        }
        allMatStr += `${i}: ${temp2}\n`
        maxMatstr += `${i}: ${temp3}\n`
        needmatstr += `${i}: ${temp4}\n`

    }
    console.log(`The Allocation Matrix is...\n   ${temp}\n${allMatStr}`);
    console.log(`The Max Matrix is...\n   ${temp}\n${maxMatstr}`);
    console.log(`The Need Matrix is...\n   ${temp}\n${needmatstr}`);
    console.log(`The Available vector is...\n ${temp} \n ${available.join(" ")}\n`);


}

//Display request data
let displayRequestData = (prodcessID, request) => {
    console.log(`The request vector is:`);
    console.log(`   ${temp}`);
    console.log(`${prodcessID}: ${request.join(" ")}\n`);

}

function checkState(n, m, allMat, needMat, maxMat, avail) {
    //order of the processes processed
    var processedPool = [];

    while (processedPool.length < n) {
        var ll = processedPool.length
        for (let index = 0; index < n; index++) {
            if (!processedPool.includes(index) && checkSmall(m, needMat[index], avail)) {
                avail = addAlloc(m, avail, allMat[index])
                processedPool.push(index);


            }

        }
        if (ll == processedPool.length) {
            return [false, processedPool];
        }


    }
    return [true, processedPool];

}

//Function to check if array1 is smaller than array2
function checkSmall(m, arr1, arr2) {
    for (let index = 0; index < m; index++) {
        if (arr1[index] > arr2[index]) {
            return false
        }


    }
    return true
}


//Add to allocation matrix
function addAlloc(m, arr1, arr2) {
    for (let i = 0; i < m; i++) {
        arr1[i] = arr1[i] + arr2[i]

    }
    return arr1;
}

//check request state and return available vector
function checkrequestState(m, request, avail, prodcessID, maxMa, allMa, need) {
    for (let index = 0; index < m; index++) {
        allMa[prodcessID][index] += request[index];
        need[prodcessID][index] -= request[index];
        avail[index] = avail[index] - request[index];



    }
    let a = checkState(n, m, [...allMa], [...need], [...maxMa], [...avail])
    return [a[0], a[1], avail]
}



//find the next character in the file that is not a whitespace
function find(data, i) {
    var x = i;
    while (data[x].trim() === '') {
        x++;
    }
    return x;
}