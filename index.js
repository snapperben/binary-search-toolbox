
/**
 * Base from .... http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
 *
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 * SORT Functions taking a & b
 *  a is in the array. b is the object looking to be found/inserted
 *
 *  res < 0 : b comes after a ==> move search balance point to later in the array
 *  res > 0 : b comes before a ==> move search balance point to earlier in the array
 *  res == 0 : and b are equal
 *
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not found.
 */
'use strict';
define([], function () {
	var BinarySearchUtils = {};
		BinarySearchUtils.binaryIndexSplice = function (_searchArray, _obj, _keyProp, _action) {

			var res = -1, minIndex = 0,
				maxIndex = _searchArray.length - 1,
				currentIndex = 0, currentElement = null, sortRes = null,
				action = isStr(_action) ? _action.toUpperCase() : _action;

			if (!(action === 'D' || action === 'I' || action === 'R' || action === 'F' || action === 'S'))
				throw new Error('BinarySearchUtils.binaryIndexSplice::Unrecognized action of :' +
								_action + ' supplied...must be one of D(elete),I(nsert),R(eplace),F(ind) or (S)earch!');
			if (!_obj)
				throw new Error('BinarySearchUtils.binaryIndexSplice::No object passed!');
			if (!(_searchArray && Array.isArray(_searchArray)))
				throw new Error('BinarySearchUtils.binaryIndexSplice::No valid search array passed!');

			while (minIndex <= maxIndex) {
				currentIndex = Math.floor((minIndex + maxIndex) / 2.0);
				currentElement = _searchArray[currentIndex];
				sortRes =  currentElement[_keyProp] < _obj[_keyProp] ? -1 : currentElement[_keyProp] > _obj[_keyProp] ? 1 : 0;
				if (sortRes < 0) {
					minIndex = currentIndex + 1;			// _obj after _searchArray[currentIndex]
					if (minIndex > maxIndex) currentIndex = minIndex;
				}
				else if (sortRes > 0) {
					maxIndex = currentIndex - 1;		// _searchArray[currentIndex] before _obj
					if (minIndex > maxIndex) currentIndex = minIndex;
				} else {
					res = currentIndex;
					switch (action) {
						case 'D':
							_searchArray.splice(currentIndex, 1)
							break;
						case 'R':
							_searchArray[currentIndex] = _obj;
							break;
						case 'I':
							// Cannot insert duplicates
							return -1;
							break;
						default:
							// Find, Search....return the located index
							break;
					}
					return res;
				}
			}
			if (minIndex > maxIndex) {
				res = currentIndex
				switch (action) {
					case 'I':
						_searchArray.splice(currentIndex, 0, _obj);
						break;
					case 'R':
					case 'F':
					case 'D':
						res = -1;
					default:
						// Search --- we want to know where it would go if it was inserted
						break;
				}
			}

			return res;
		};
	/**
	 * General binary search mechanism for numeric arrays.
	 * N.B. NO DUPLICATES allowed
	 *
	 * @param _val - The value that is being searched for
	 * @param _array - The array to search in
	 * @param _insert - Explicit bool to indicate that we are inserting (i.e. return the place we
	 * 					need to insert at)

	 * @returns {number}
	 */
	BinarySearchUtils.binarySearch = function(_val, _array, _insert) {
		var setInsertPoint = _insert === true;
		var minIndex = 0;
		var maxIndex = _array.length - 1;
		var currentIndex = 0;
		var sortRes = null;

		while (minIndex <= maxIndex) {
			currentIndex = Math.floor( (minIndex + maxIndex) / 2.0);
			sortRes = _array[currentIndex] - _val;									//!!
			if (sortRes < 0) {		// _val after currIndex							//!!
				minIndex = currentIndex + 1;
				if (minIndex > maxIndex) currentIndex = minIndex;
			}
			else if (sortRes > 0){		// _val before currIndex					//!!
				maxIndex = currentIndex - 1;
				if (minIndex > maxIndex) currentIndex = minIndex;
			} else {
				// Return -1 if we're looking at inserting and we have found
				if (setInsertPoint) currentIndex = -1;
				break;
			}
		}
		if (minIndex > maxIndex && !setInsertPoint) currentIndex = -1;
		return currentIndex;
	};
	/**
	 * General binary object search mechanism
	 *
	 * @param _obj - The object that is being searched for
	 * @param _array - The aray to search in
	 * @param _orderFn - the ordering function to use in the search
	 * @param _allowDuplicates - Explicit bool value to allow duplicates
	 * @param _insert - Explicit bool to indicate  that
	 * @param _auxSortFn - Function to sort duplicate items on insertion and to locate a specific
	 * 					   object on deletion
	 * @returns {number}
	 */
	BinarySearchUtils.binaryObjectSearch = function(_obj, _array, _orderFn, _allowDuplicates, _insert, _auxSortFn) {
		var allowDuplicates = _allowDuplicates === true,setInsertPoint = _insert === true,
			auxSortFn = (allowDuplicates && typeof _auxSortFn == 'function')?_auxSortFn:null,
			minIndex = 0,maxIndex = _array.length - 1,currentIndex = 0,sortRes = null;

		if (_array.length == 0) return setInsertPoint ? 0 : -1
		else {
			if (_orderFn(_array[0], _obj) > 0) {
				return setInsertPoint ? 0 : -1;												//!!
			} else {
				if (_orderFn(_array[maxIndex], _obj) < 0) {
					return setInsertPoint ? _array.length : -1;						//!!
				}
			}
		}

		while (minIndex <= maxIndex) {
			currentIndex = Math.floor( (minIndex + maxIndex) / 2.0);
			sortRes = _orderFn(_array[currentIndex], _obj);
			if (sortRes < 0) {		// b after a							//!!
				minIndex = currentIndex + 1;
				if (minIndex > maxIndex) {
					if (setInsertPoint) currentIndex = minIndex
					else currentIndex = -1
				}
			}
			else if (sortRes > 0){		// b before a						//!!
				maxIndex = currentIndex - 1;
				if (minIndex > maxIndex) {
					if (setInsertPoint) currentIndex = minIndex
					else currentIndex = -1
				}
			}
			else {
				if (setInsertPoint && !allowDuplicates) return -1;	// we are inserting and no duplicates are allowed so ERROR!
				else if (allowDuplicates) {
					if (setInsertPoint) {
						if (auxSortFn) { // auxSortFn is used to find the correct insertion point
							// Locate the first duplicate in the array.
							while (currentIndex > 0 && (_orderFn(_array[currentIndex - 1], _obj) == 0))
								currentIndex--;
							// More forward through the array whilst keeping the main sort test as 0,
							// use the aux sort to find the correct place
							while (currentIndex <= maxIndex &&
							       _orderFn(_array[currentIndex], _obj) == 0 &&
							       auxSortFn(_array[currentIndex], _obj) < 0)						//!!
								currentIndex++;
						} else { // Find the last duplicate so the new one can be added to the end
							while (currentIndex <= maxIndex && (_orderFn(_array[currentIndex], _obj) == 0))
								currentIndex++;
						}
					} else {
						// Locate the first duplicate in the array.
						while (currentIndex > 0 && (_orderFn(_array[currentIndex - 1], _obj) == 0))
							currentIndex--;
						if (auxSortFn) {
							while (currentIndex < maxIndex && _orderFn(_array[currentIndex + 1], _obj) == 0){
								var auxSortVal = auxSortFn(_array[currentIndex], _obj);
								if (auxSortVal < 0) currentIndex++;						//!!
								else if (auxSortVal == 0){
									break;
								} else return -1;		// Not located
							}
						}
					}
				}
				break;
			}
		}
		return currentIndex;
	};
	/**
	 * Simplistic sort function for objects
	 *
	 * @param _array - Array to sort
	 * @param _orderFn - Ordering function for objects
	 * @param _allowDuplicates
	 * @param _auxSortFn - function tgo sort duplicates
	 * @returns {Array}
	 */
	BinarySearchUtils.orderObjects = function(_array, _orderFn, _allowDuplicates, _auxSortFn){
		var tmpArray = [],insIdx=-1;
		for (var i=0;i<_array.length;i++){
			insIdx = BinarySearchUtils.binaryObjectSearch(_array[i],tmpArray,_orderFn,_allowDuplicates,true,_auxSortFn);
			tmpArray.splice(insIdx,0,_array[i]);
		}
		return tmpArray;
	};
	/**
	 * Simplistic sort function for numeric values
	 *
	 * @param _array - Array to be sorted
	 * @returns {Array}
	 */
	BinarySearchUtils.orderValues = function(_array){
		var tmpArray = [],insIdx=-1;
		for (var i=0;i<_array.length;i++){
			insIdx = BinarySearchUtils.binarySearch(_array[i],tmpArray,true);
			tmpArray.splice(insIdx,0,_array[i]);
		}
		return tmpArray;
	};
	return BinarySearchUtils;
});
