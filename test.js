const test = require('ava');
const binarySearch = require('./BinarySearchToolbox');

test('Sort basic numeric array', t => {
    let arr = [1,8,4], sortedArray = [1,4,8];
    let newArr = binarySearch.searchUtils.orderValues(arr);

    t.truthy(newArr[0] === sortedArray[0] && newArr[1] === sortedArray[1] && newArr[2] === sortedArray[2]);
});

 test('Add objects to array by id', async t => {
    let arr = [], bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'};
    binarySearch.searchUtils.binaryIndexSplice(arr, bob, 'id', 'I');
    t.truthy(arr.length  === 1 && arr[0].name === 'Bob');

    binarySearch.searchUtils.binaryIndexSplice(arr, dave, 'id', 'I');
    t.truthy(arr.length  === 2 && arr[1].name === 'Dave');

    binarySearch.searchUtils.binaryIndexSplice(arr, ruth, 'id', 'I');
    t.truthy(arr.length  === 3 && arr[1].name === 'Ruth');
});

test('Add objects to array by name', async t => {
    let arr = [], bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'};
    binarySearch.searchUtils.binaryIndexSplice(arr, ruth, 'name', 'I');
    binarySearch.searchUtils.binaryIndexSplice(arr, bob, 'name', 'I');
    binarySearch.searchUtils.binaryIndexSplice(arr, dave, 'name', 'I');

    t.truthy(arr.length  === 3);
    t.truthy(arr[0].name === 'Bob');
    t.truthy(arr[1].name === 'Dave');
    t.truthy(arr[2].name === 'Ruth');
});

test('Use search', async t => {
    let managedArray = new binarySearch.Toolbox('name'),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'};
    managedArray.add(ruth);
    managedArray.add(bob);
    managedArray.add(dave);

    t.truthy(managedArray.length()  === 3);
    t.truthy(managedArray.getSortProp(0) === 'Bob');
    t.truthy(managedArray.getSortProp(1) === 'Dave');
    t.truthy(managedArray.getSortProp(2) === 'Ruth');
});