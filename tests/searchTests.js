const test = require('ava');
const binarySearch = require('../BinarySearchToolbox');

test('Basic use of search toolbox', async t => {
    let managedArray = new binarySearch.Toolbox('name'),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'};
    managedArray.insert(ruth);
    managedArray.insert(bob);
    managedArray.insert(dave);

    t.truthy(managedArray.length()  === 3);
    t.truthy(managedArray.getSortProp(0) === 'Bob');
    t.truthy(managedArray.getSortProp(1) === 'Dave');
    t.truthy(managedArray.getSortProp(2) === 'Ruth');
});

test('Searching for objects with search toolbox returns their array position', async t => {
    let managedArray = new binarySearch.Toolbox('name'),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'},
		bruce = {id:88,name:'Bruce'},
	    sarah = {id:99,name:'Sarah'};
    managedArray.insert(ruth);
    managedArray.insert(bob);
    managedArray.insert(dave);

    let ruthPosition = managedArray.searchObject(ruth),
		sarahPosition = managedArray.searchObject(sarah),
		brucePosition = managedArray.searchObject(bruce),
	bobPosition = managedArray.searchObject(bob),
	davePosition = managedArray.searchObject(dave);

    t.truthy(ruthPosition === 2);
    t.truthy(sarahPosition === -1);
    t.truthy(brucePosition === -1);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === 1);

    managedArray.insert(sarah);
    managedArray.insert(bruce);
    ruthPosition = managedArray.searchObject(ruth);
	sarahPosition = managedArray.searchObject(sarah);
	brucePosition = managedArray.searchObject(bruce);
	bobPosition = managedArray.searchObject(bob);
	davePosition = managedArray.searchObject(dave);

	t.truthy(ruthPosition === 3);
    t.truthy(sarahPosition === 4);
    t.truthy(brucePosition === 1);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === 2);
});

test('Deleting objects with search toolbox returns the deleted object', async t => {
    let managedArray = new binarySearch.Toolbox('name'),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'},
	    sarah = {id:99,name:'Sarah'};
    managedArray.insert(ruth);
    managedArray.insert(bob);
    managedArray.insert(dave);

    let ruthPosition = managedArray.searchObject(ruth),
	bobPosition = managedArray.searchObject(bob),
	davePosition = managedArray.searchObject(dave);

    t.truthy(ruthPosition === 2);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === 1);

    let daveDelRes = managedArray.deleteObject(dave),
		sarahDelRes = managedArray.deleteObject(sarah);

    t.truthy(daveDelRes.id === 6);
    t.truthy(sarahDelRes === -1);

    ruthPosition = managedArray.searchObject(ruth);
	bobPosition = managedArray.searchObject(bob);
	davePosition = managedArray.searchObject(dave);

	t.truthy(ruthPosition === 1);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === -1);
});

test('Replacing objects with search toolbox', async t => {
	let managedArray = new binarySearch.Toolbox('name'),
		bob = {id: 1, name: 'Bob'},
		dave = {id: 6, name: 'Dave'},
		otherDave = {id: 64, name: 'Dave'},
		ruth = {id: 2, name: 'Ruth'};
	managedArray.insert(ruth);
	managedArray.insert(bob);
	managedArray.insert(dave);

	let ruthPosition = managedArray.searchObject(ruth),
		bobPosition = managedArray.searchObject(bob),
		davePosition = managedArray.searchObject(dave);

	t.truthy(ruthPosition === 2);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);

	let replacedDavePos = managedArray.replaceObject(otherDave),
	newDave = managedArray.get(replacedDavePos);

	ruthPosition = managedArray.searchObject(ruth);
	bobPosition = managedArray.searchObject(bob);
	davePosition = managedArray.searchObject(otherDave);

	t.truthy(ruthPosition === 2);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);
	t.truthy(newDave.id === otherDave.id);
	t.truthy(newDave.id === 64);
});

test('Inserting duplicate objects with search toolbox', async t => {
	let managedArray = new binarySearch.Toolbox('name'),
		bob = {id: 1, name: 'Bob'},
		dave = {id: 6, name: 'Dave'},
		otherDave = {id: 64, name: 'Dave'},
		ruth = {id: 2, name: 'Ruth'};
	managedArray.insert(ruth);
	managedArray.insert(bob);
	managedArray.insert(dave);

	let ruthPosition = managedArray.searchObject(ruth),
		bobPosition = managedArray.searchObject(bob),
		davePosition = managedArray.searchObject(dave);

	t.truthy(ruthPosition === 2);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);

	let otherDaveInsertPos = managedArray.insert(otherDave),
	newDave = managedArray.get(davePosition);

	ruthPosition = managedArray.searchObject(ruth);
	bobPosition = managedArray.searchObject(bob);
	davePosition = managedArray.searchObject(otherDave);

	t.truthy(ruthPosition === 2);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);
	t.truthy(newDave.id !== otherDave.id);
	t.truthy(newDave.id === 6);
});

test('Finding objects with search toolbox returns the object', async t => {
	let managedArray = new binarySearch.Toolbox('name'),
		bob = {id: 221, name: 'Bob'},
		dave = {id: 88, name: 'Dave'},
		ruth = {id: 56, name: 'Ruth'},
		sarah = {id:99,name:'Sarah'};
	managedArray.insert(ruth);
	managedArray.insert(bob);
	managedArray.insert(dave);

	let ruthObj = managedArray.findObject(ruth),
		bobObj = managedArray.findObject(bob),
		daveObj = managedArray.findObject(dave),
	saraObj = managedArray.findObject(sarah);

	t.truthy(ruthObj.id === 56);
	t.truthy(bobObj.id === 221);
	t.truthy(daveObj.id === 88);
	t.truthy(saraObj === -1);
});