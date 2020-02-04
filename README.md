# binary-search-toolbox
A set of utilities for using binary search on sorted lists



###General binary object search mechanism

* _obj - The object that is being searched for
* _array - The aray to search in
* _orderFn - the ordering function to use in the search
* _allowDuplicates - Explicit bool value to allow duplicates
* _insert - Explicit bool to indicate  that
* _auxSortFn - Function to sort duplicate items on insertion and to locate a specific
					   object on deletion
returns {number}


binaryObjectSearch(_obj, _array, _orderFn, _allowDuplicates, _insert, _auxSortFn) {