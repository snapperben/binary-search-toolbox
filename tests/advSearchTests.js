const test = require('ava');
const advBinarySearch = require('../BinarySearchToolbox');

test('Basic use of advanced search toolbox', async t => {
    let managedArray = new advBinarySearch.advToolbox(),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'};
    managedArray.insertObject(ruth);
    t.truthy(managedArray.length()  === 1);
    t.truthy(managedArray.get(0)['name'] === 'Ruth');

    managedArray.insertObject(bob);
    t.truthy(managedArray.length()  === 2);
    t.truthy(managedArray.get(0)['name'] === 'Bob');
    t.truthy(managedArray.get(1)['name'] === 'Ruth');

    managedArray.insertObject(dave);
    t.truthy(managedArray.length()  === 3);
    t.truthy(managedArray.get(0)['name'] === 'Bob');
    t.truthy(managedArray.get(1)['name']  === 'Dave');
    t.truthy(managedArray.get(2)['name']  === 'Ruth');
});

test('Searching for objects with adv search toolbox returns their array position', async t => {
    let managedArray = new advBinarySearch.advToolbox(),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'},
		bruce = {id:88,name:'Bruce'},
	    sarah = {id:99,name:'Sarah'};
    managedArray.insertObject(ruth);
    managedArray.insertObject(bob);
    managedArray.insertObject(dave);

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

    managedArray.insertObject(sarah);
    managedArray.insertObject(bruce);
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

test('Deleting objects with adv search toolbox returns the deleted object', async t => {
    let managedArray = new advBinarySearch.advToolbox(),
        bob = {id:1,name:'Bob'},
        dave = {id:6,name:'Dave'},
        ruth = {id:2,name:'Ruth'},
	    sarah = {id:99,name:'Sarah'};
    managedArray.insertObject(ruth);
    managedArray.insertObject(bob);
    managedArray.insertObject(dave);

    let ruthPosition = managedArray.findObject(ruth),
	bobPosition = managedArray.findObject(bob),
	davePosition = managedArray.findObject(dave);

    t.truthy(ruthPosition === 2);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === 1);

    let daveDelRes = managedArray.deleteObject(dave),
		sarahDelRes = managedArray.deleteObject(sarah);

    t.truthy(daveDelRes.id === 6);
    t.truthy(sarahDelRes === -1);

    ruthPosition = managedArray.findObject(ruth);
	bobPosition = managedArray.findObject(bob);
	davePosition = managedArray.findObject(dave);

	t.truthy(ruthPosition === 1);
    t.truthy(bobPosition === 0);
    t.truthy(davePosition === -1);
});

test('Inserting duplicate objects with adv search toolbox', async t => {
	let managedArray = new advBinarySearch.advToolbox(),
		bob = {id: 1, name: 'Bob'},
		dave = {id: 6, name: 'Dave'},
		otherDave = {id: 64, name: 'Dave'},
		ruth = {id: 2, name: 'Ruth'};
	managedArray.insertObject(ruth);
	managedArray.insertObject(bob);
	managedArray.insertObject(dave);

	let ruthPosition = managedArray.findObject(ruth),
		bobPosition = managedArray.findObject(bob),
		davePosition = managedArray.findObject(dave);

	t.truthy(ruthPosition === 2);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);

	let otherDaveInsertPos = managedArray.insertObject(otherDave),
	newDave = managedArray.get(davePosition);

	ruthPosition = managedArray.findObject(ruth);
	bobPosition = managedArray.findObject(bob);
	davePosition = managedArray.findObject(dave);
	let otherDavePosition = managedArray.findObject(otherDave);

	t.truthy(ruthPosition === 3);
	t.truthy(bobPosition === 0);
	t.truthy(davePosition === 1);
	console.log(`Arrray is :${managedArray.dump(true)}`);
	t.truthy(otherDaveInsertPos === 2);
	t.truthy(newDave.id !== otherDave.id);
	t.truthy(newDave.id === 6);
});