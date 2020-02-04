const test = require('ava');
const binarySearch = require('../BinarySearchToolbox');

test('Basic use of search toolbox', async t => {
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

test('Finding objects with search toolbox', async t => {
    let managedArray = new binarySearch.Toolbox('name'),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'},
		bruce = {id:88,name:'Bruce'},
	    sarah = {id:99,name:'Sarah'};
    managedArray.add(ruth);
    managedArray.add(bob);
    managedArray.add(dave);

    let ruthPosition = managedArray.findObject(ruth),
		sarahPosition = managedArray.findObject(sarah),
		brucePosition = managedArray.findObject(bruce),
	bobPosition = managedArray.findObject(bob),
	davePosition = managedArray.findObject(dave);

    t.truthy(ruthPosition === 2);
    t.truthy(sarahPosition === -1);
    t.truthy(brucePosition === -1);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === 1);

    managedArray.add(sarah);
    managedArray.add(bruce);
    ruthPosition = managedArray.findObject(ruth);
	sarahPosition = managedArray.findObject(sarah);
	brucePosition = managedArray.findObject(bruce);
	bobPosition = managedArray.findObject(bob);
	davePosition = managedArray.findObject(dave);

	t.truthy(ruthPosition === 3);
    t.truthy(sarahPosition === 4);
    t.truthy(brucePosition === 1);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === 2);
});

test('Deleting objects with search toolbox', async t => {
    let managedArray = new binarySearch.Toolbox('name'),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'},
	    sarah = {id:99,name:'Sarah'};
    managedArray.add(ruth);
    managedArray.add(bob);
    managedArray.add(dave);

    let ruthPosition = managedArray.findObject(ruth),
	bobPosition = managedArray.findObject(bob),
	davePosition = managedArray.findObject(dave);

    t.truthy(ruthPosition === 2);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === 1);

    let daveDelRes = managedArray.deleteObject(dave),
		sarahDelRes = managedArray.deleteObject(sarah);

    t.truthy(daveDelRes === 1);
    t.truthy(sarahDelRes === -1);

    ruthPosition = managedArray.findObject(ruth);
	bobPosition = managedArray.findObject(bob);
	davePosition = managedArray.findObject(dave);

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
	managedArray.add(ruth);
	managedArray.add(bob);
	managedArray.add(dave);

	let ruthPosition = managedArray.findObject(ruth),
		bobPosition = managedArray.findObject(bob),
		davePosition = managedArray.findObject(dave);

	t.truthy(ruthPosition === 2);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);

	let replacedDavePos = managedArray.replaceObject(otherDave),
	newDave = managedArray.get(replacedDavePos);

	ruthPosition = managedArray.findObject(ruth);
	bobPosition = managedArray.findObject(bob);
	davePosition = managedArray.findObject(otherDave);

	t.truthy(ruthPosition === 2);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);
	t.truthy(newDave.id === otherDave.id);
});