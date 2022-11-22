// Write a program that randomly chooses an item from an array of positive integers while the
// probability of choosing each item is directly correlated to the number in the array. For example, if
// the array is [1,2,3] the probability of choosing 1 is 1/6 the probability of choosing 2 is 1/3 and the
// probability of choosing 3 is 0.5. Another example: [1,3,5] means 1/9 for 1, 1/3 for 3 and 5/9 for 5

// Overall complexity O(n) + O(log(n)) + O(1) = O(n)
function getRandomElementWithCorreletedProbability(positiveIntegers) {
    const numberOfIntegers = positiveIntegers.length;
    
    // empty array handing
    if (!numberOfIntegers) {
        return null;
    }

    // only one element handling
    if (numberOfIntegers === 1) {
        return positiveIntegers[0];
    }

    // creation of intervals O(n)
    const intervals = createIntervals(positiveIntegers);
    const endOfIntervals = intervals[numberOfIntegers - 1][1] - 1;

    // generation of a random number from 1 to the end of the last interval O(1)
    const randomizedNumber = getRandomIntInRange(0, endOfIntervals);

    // boolean search through the intervals O(log(n))
    const resultIndex = findRandomizedNumberInIntervals(intervals, randomizedNumber);

    // BINGO
    return positiveIntegers[resultIndex];
}

function createIntervals(positiveIntegers) {
    const intervals = new Array(positiveIntegers.length);
    let start = 0, end = 0;

    for (let i = 0; i < positiveIntegers.length; i++) {
        const newEnd = end + positiveIntegers[i];
        intervals[i] = [start, newEnd];
        [start, end] = [newEnd, newEnd];
    }

    return intervals;
}

function getRandomIntInRange(min, max) {
    // js magic
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findRandomizedNumberInIntervals(intervals, randomizedNumber) {
    let start = 0;
    let end = intervals.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        const intervalStart = intervals[middle][0];
        const intervalEnd = intervals[middle][1];

        if (randomizedNumber >= intervalStart && randomizedNumber < intervalEnd) {
            return middle;
        } else if (randomizedNumber < intervalStart) {
            end = middle;
        } else {
            start = middle + 1;
        }
    }

    return -1;
}

// HELPER NUMBERS
const oneHundred = 100;
const oneHundredOfThousand = 1000_00;
const oneMillion = 1_000_000;
const oneBillion = 1_000_000_000;
const oneTrillion = 1_000_000_000_000;

// THE HARDEST WORKER IN THE OFFICE
function runTest(positiveIntegers, numberOfIterations = oneHundredOfThousand) {
    const occurrences = new Map();

    for (let i = 0; i < numberOfIterations; i++) {
        const randomizedNumber = getRandomElementWithCorreletedProbability(positiveIntegers);

        let counter = occurrences.get(randomizedNumber);
        if (!counter) {
            occurrences.set(randomizedNumber, 1);
        } else {
            occurrences.set(randomizedNumber, counter + 1)
        }
    }

    return occurrences;
}

console.log('TESTING TIME!!!!!!!')
let testData = [1,2,3]
console.log(`\n[1,2,3] TESTING]: TEST_DATA: ${testData}`);
console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓RESULTS BELOW↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
console.log(runTest(testData, oneMillion));
testData = [1,3,5]
console.log(`\n[1,3,5] TESTING]: TEST_DATA: ${testData}`);
console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓RESULTS BELOW↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
console.log(runTest(testData, oneMillion));
testData = [1, 2, 6, 8, 3, 4, 5, 7, 9, 10];
console.log(`\n[LOAD TESTING]: TEST_DATA: ${testData} NUMBER OF ITERATIONS: ${oneMillion}`);
console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓RESULTS BELOW↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
console.log(runTest(testData, oneMillion));
testData = [10]
console.log(`\n[ARRAY WITH ONLY ONE ELEMENT]: TEST_DATA: ${testData}`);
console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓RESULTS BELOW↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
console.log(runTest(testData, oneMillion));
