const test = require('ava');
const toolbox = require('./BinarySearchToolbox');

test('Sort basic numeric array', t => {
    let arr = [1,8,4], sortedArray = [1,4,8];
    let newArr = toolbox.orderValues(arr);
    t.truthy(newArr[0] === sortedArray[0] && newArr[1] === sortedArray[1] && newArr[2] === sortedArray[2]);
});

test('Add objects to array by id', async t => {
    let arr = [], bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'};
    toolbox.binaryIndexSplice(arr, bob, 'id', 'I');
    t.truthy(arr.length  === 1 && arr[0].name === 'Bob');

    toolbox.binaryIndexSplice(arr, dave, 'id', 'I');
    t.truthy(arr.length  === 2 && arr[1].name === 'Dave');

    toolbox.binaryIndexSplice(arr, ruth, 'id', 'I');
    t.truthy(arr.length  === 3 && arr[1].name === 'Ruth');
});

test('Add objects to array by name', async t => {
    let arr = [], bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'};
    toolbox.binaryIndexSplice(arr, ruth, 'name', 'I');
    toolbox.binaryIndexSplice(arr, bob, 'name', 'I');
    toolbox.binaryIndexSplice(arr, dave, 'name', 'I');

    t.truthy(arr.length  === 3);
    t.truthy(arr[0].name === 'Bob');
    t.truthy(arr[1].name === 'Dave');
    t.truthy(arr[2].name === 'Ruth');
});