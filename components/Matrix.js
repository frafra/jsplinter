var Matrix = (function () { 'use strict';

function applyComputations ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'matrix' in newState && typeof state.matrix === 'object' || state.matrix !== oldState.matrix ) ) {
		state.rows = newState.rows = template.computed.rows( state.matrix );
	}
	
	if ( isInitial || ( 'matrix' in newState && typeof state.matrix === 'object' || state.matrix !== oldState.matrix ) ) {
		state.columns = newState.columns = template.computed.columns( state.matrix );
	}
}

var template = (function () {
  return {
    computed: {
      rows: matrix => [...Array(matrix.size()[0]).keys()],
      columns: matrix => [...Array(matrix.size()[1]).keys()],
    },
    methods: {
      change (row, col, target) {
        if (target.checkValidity()) {
          var matrix = this.get('matrix');
          matrix.set([row, col], parseFloat(target.value));
          this.set({'matrix':matrix});
        }
      },
      tmp (col, target) {
        var tmp = this.get('tmp');
        tmp[col].value = target.value;
        tmp[col].validity = target.checkValidity() && target.value.length > 0;
        this.set({'tmp':tmp});
      },
      add () {
        var tmp = this.get('tmp');
        if (tmp[0].validity && tmp[1].validity) {
          var array = this.get('matrix').toArray();
          array.push(tmp.map(item => parseFloat(item.value)));
          this.set({'matrix':math.matrix(array)});
          tmp = [{value:null, validity:false}, {value:null, validity:false}]
          this.set({'tmp':tmp});
        }
      },
      remove (row) {
        var array = this.get('matrix').toArray();
        array.splice(row, 1);
        this.set({'matrix':math.matrix(array)});
      }
    }
  }
}());

function renderMainFragment ( root, component ) {
	var table = createElement( 'table' );
	table.className = "pure-table pure-table-bordered";
	
	var thead = createElement( 'thead' );
	
	appendNode( thead, table );
	
	var tr = createElement( 'tr' );
	
	appendNode( tr, thead );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, tr );
	var eachBlock_value = root.headings;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	appendNode( createText( "\n      " ), tr );
	var ifBlock_anchor = createComment();
	appendNode( ifBlock_anchor, tr );
	
	function getBlock ( root ) {
		if ( root.editable ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
	appendNode( createText( "\n  " ), table );
	var eachBlock1_anchor = createComment();
	appendNode( eachBlock1_anchor, table );
	var eachBlock1_value = root.rows;
	var eachBlock1_iterations = [];
	
	for ( var i1 = 0; i1 < eachBlock1_value.length; i1 += 1 ) {
		eachBlock1_iterations[i1] = renderEachBlock1( root, eachBlock1_value, eachBlock1_value[i1], i1, component );
		eachBlock1_iterations[i1].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
	}
	
	appendNode( createText( "\n  " ), table );
	var ifBlock3_anchor = createComment();
	appendNode( ifBlock3_anchor, table );
	
	function getBlock3 ( root ) {
		if ( root.editable ) return renderIfBlock3_0;
		return null;
	}
	
	var currentBlock3 = getBlock3( root );
	var ifBlock3 = currentBlock3 && currentBlock3( root, component );
	
	if ( ifBlock3 ) ifBlock3.mount( ifBlock3_anchor.parentNode, ifBlock3_anchor );

	return {
		mount: function ( target, anchor ) {
			insertNode( table, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = root.headings;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			var eachBlock1_value = root.rows;
			
			for ( var i1 = 0; i1 < eachBlock1_value.length; i1 += 1 ) {
				if ( !eachBlock1_iterations[i1] ) {
					eachBlock1_iterations[i1] = renderEachBlock1( root, eachBlock1_value, eachBlock1_value[i1], i1, component );
					eachBlock1_iterations[i1].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
				} else {
					eachBlock1_iterations[i1].update( changed, root, eachBlock1_value, eachBlock1_value[i1], i1 );
				}
			}
			
			teardownEach( eachBlock1_iterations, true, eachBlock1_value.length );
			
			eachBlock1_iterations.length = eachBlock1_value.length;
			
			var _currentBlock3 = currentBlock3;
			currentBlock3 = getBlock3( root );
			if ( _currentBlock3 === currentBlock3 && ifBlock3) {
				ifBlock3.update( changed, root );
			} else {
				if ( ifBlock3 ) ifBlock3.teardown( true );
				ifBlock3 = currentBlock3 && currentBlock3( root, component );
				if ( ifBlock3 ) ifBlock3.mount( ifBlock3_anchor.parentNode, ifBlock3_anchor );
			}
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );
			
			if ( ifBlock ) ifBlock.teardown( false );
			
			teardownEach( eachBlock1_iterations, false );
			
			if ( ifBlock3 ) ifBlock3.teardown( false );
			
			if ( detach ) {
				detachNode( table );
			}
		}
	};
}

function renderIfBlock3_0 ( root, component ) {
	var tr = createElement( 'tr' );
	
	var eachBlock3_anchor = createComment();
	appendNode( eachBlock3_anchor, tr );
	var eachBlock3_value = root.columns;
	var eachBlock3_iterations = [];
	
	for ( var i = 0; i < eachBlock3_value.length; i += 1 ) {
		eachBlock3_iterations[i] = renderEachBlock3( root, eachBlock3_value, eachBlock3_value[i], i, component );
		eachBlock3_iterations[i].mount( eachBlock3_anchor.parentNode, eachBlock3_anchor );
	}
	
	appendNode( createText( "\n      " ), tr );
	
	var td = createElement( 'td' );
	
	appendNode( td, tr );
	
	var button = createElement( 'button' );
	
	function clickHandler ( event ) {
		component.add();
	}
	
	addEventListener( button, 'click', clickHandler );
	
	appendNode( button, td );
	appendNode( createText( "➕" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock3_value = root.columns;
			
			for ( var i = 0; i < eachBlock3_value.length; i += 1 ) {
				if ( !eachBlock3_iterations[i] ) {
					eachBlock3_iterations[i] = renderEachBlock3( root, eachBlock3_value, eachBlock3_value[i], i, component );
					eachBlock3_iterations[i].mount( eachBlock3_anchor.parentNode, eachBlock3_anchor );
				} else {
					eachBlock3_iterations[i].update( changed, root, eachBlock3_value, eachBlock3_value[i], i );
				}
			}
			
			teardownEach( eachBlock3_iterations, true, eachBlock3_value.length );
			
			eachBlock3_iterations.length = eachBlock3_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock3_iterations, false );
			
			removeEventListener( button, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( tr );
			}
		}
	};
}

function renderEachBlock3 ( root, eachBlock3_value, col, col__index, component ) {
	var td = createElement( 'td' );
	
	var input = createElement( 'input' );
	var last_input_value = root.tmp[col].value;
	input.value = last_input_value;
	
	function changeHandler ( event ) {
		var eachBlock3_value = this.__svelte.eachBlock3_value, col__index = this.__svelte.col__index, col = eachBlock3_value[col__index]
		
		component.tmp(col, event.target);
	}
	
	addEventListener( input, 'change', changeHandler );
	
	input.type = "number";
	input.step = "any";
	
	input.__svelte = {
		eachBlock3_value: eachBlock3_value,
		col__index: col__index
	};
	
	appendNode( input, td );

	return {
		mount: function ( target, anchor ) {
			insertNode( td, target, anchor );
		},
		
		update: function ( changed, root, eachBlock3_value, col, col__index ) {
			var __tmp;
		
			if ( ( __tmp = root.tmp[col].value ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
			
			input.__svelte.eachBlock3_value = eachBlock3_value;
			input.__svelte.col__index = col__index;
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'change', changeHandler );
			
			if ( detach ) {
				detachNode( td );
			}
		}
	};
}

function renderEachBlock1 ( root, eachBlock1_value, row, row__index, component ) {
	var tr = createElement( 'tr' );
	
	var eachBlock2_anchor = createComment();
	appendNode( eachBlock2_anchor, tr );
	var eachBlock2_value = root.columns;
	var eachBlock2_iterations = [];
	
	for ( var i = 0; i < eachBlock2_value.length; i += 1 ) {
		eachBlock2_iterations[i] = renderEachBlock2( root, eachBlock1_value, row, row__index, eachBlock2_value, eachBlock2_value[i], i, component );
		eachBlock2_iterations[i].mount( eachBlock2_anchor.parentNode, eachBlock2_anchor );
	}
	
	appendNode( createText( "\n      " ), tr );
	var ifBlock2_anchor = createComment();
	appendNode( ifBlock2_anchor, tr );
	
	function getBlock2 ( root, eachBlock1_value, row, row__index ) {
		if ( root.editable ) return renderIfBlock2_0;
		return null;
	}
	
	var currentBlock2 = getBlock2( root, eachBlock1_value, row, row__index );
	var ifBlock2 = currentBlock2 && currentBlock2( root, eachBlock1_value, row, row__index, component );
	
	if ( ifBlock2 ) ifBlock2.mount( ifBlock2_anchor.parentNode, ifBlock2_anchor );

	return {
		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );
		},
		
		update: function ( changed, root, eachBlock1_value, row, row__index ) {
			var __tmp;
		
			var eachBlock2_value = root.columns;
			
			for ( var i = 0; i < eachBlock2_value.length; i += 1 ) {
				if ( !eachBlock2_iterations[i] ) {
					eachBlock2_iterations[i] = renderEachBlock2( root, eachBlock1_value, row, row__index, eachBlock2_value, eachBlock2_value[i], i, component );
					eachBlock2_iterations[i].mount( eachBlock2_anchor.parentNode, eachBlock2_anchor );
				} else {
					eachBlock2_iterations[i].update( changed, root, eachBlock1_value, row, row__index, eachBlock2_value, eachBlock2_value[i], i );
				}
			}
			
			teardownEach( eachBlock2_iterations, true, eachBlock2_value.length );
			
			eachBlock2_iterations.length = eachBlock2_value.length;
			
			var _currentBlock2 = currentBlock2;
			currentBlock2 = getBlock2( root, eachBlock1_value, row, row__index );
			if ( _currentBlock2 === currentBlock2 && ifBlock2) {
				ifBlock2.update( changed, root, eachBlock1_value, row, row__index );
			} else {
				if ( ifBlock2 ) ifBlock2.teardown( true );
				ifBlock2 = currentBlock2 && currentBlock2( root, eachBlock1_value, row, row__index, component );
				if ( ifBlock2 ) ifBlock2.mount( ifBlock2_anchor.parentNode, ifBlock2_anchor );
			}
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock2_iterations, false );
			
			if ( ifBlock2 ) ifBlock2.teardown( false );
			
			if ( detach ) {
				detachNode( tr );
			}
		}
	};
}

function renderIfBlock2_0 ( root, eachBlock1_value, row, row__index, component ) {
	var td = createElement( 'td' );
	
	var button = createElement( 'button' );
	
	function clickHandler ( event ) {
		var eachBlock1_value = this.__svelte.eachBlock1_value, row__index = this.__svelte.row__index, row = eachBlock1_value[row__index]
		
		component.remove(row);
	}
	
	addEventListener( button, 'click', clickHandler );
	
	button.__svelte = {
		eachBlock1_value: eachBlock1_value,
		row__index: row__index
	};
	
	appendNode( button, td );
	appendNode( createText( "✖" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( td, target, anchor );
		},
		
		update: function ( changed, root, eachBlock1_value, row, row__index ) {
			var __tmp;
		
			button.__svelte.eachBlock1_value = eachBlock1_value;
			button.__svelte.row__index = row__index;
		},
		
		teardown: function ( detach ) {
			removeEventListener( button, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( td );
			}
		}
	};
}

function renderEachBlock2 ( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index, component ) {
	var td = createElement( 'td' );
	
	var ifBlock1_anchor = createComment();
	appendNode( ifBlock1_anchor, td );
	
	function getBlock1 ( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index ) {
		if ( root.editable ) return renderIfBlock1_0;
		return renderIfBlock1_1;
	}
	
	var currentBlock1 = getBlock1( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index );
	var ifBlock1 = currentBlock1 && currentBlock1( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index, component );
	
	if ( ifBlock1 ) ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor );

	return {
		mount: function ( target, anchor ) {
			insertNode( td, target, anchor );
		},
		
		update: function ( changed, root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index ) {
			var __tmp;
		
			var _currentBlock1 = currentBlock1;
			currentBlock1 = getBlock1( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index );
			if ( _currentBlock1 === currentBlock1 && ifBlock1) {
				ifBlock1.update( changed, root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index );
			} else {
				if ( ifBlock1 ) ifBlock1.teardown( true );
				ifBlock1 = currentBlock1 && currentBlock1( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index, component );
				if ( ifBlock1 ) ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor );
			}
		},
		
		teardown: function ( detach ) {
			if ( ifBlock1 ) ifBlock1.teardown( false );
			
			if ( detach ) {
				detachNode( td );
			}
		}
	};
}

function renderIfBlock1_1 ( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index, component ) {
	var input = createElement( 'input' );
	var last_input_value = root.matrix.get([row, col]);
	input.value = last_input_value;
	input.readOnly = true;

	return {
		mount: function ( target, anchor ) {
			insertNode( input, target, anchor );
		},
		
		update: function ( changed, root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index ) {
			var __tmp;
		
			if ( ( __tmp = root.matrix.get([row, col]) ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( input );
			}
		}
	};
}

function renderIfBlock1_0 ( root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index, component ) {
	var input = createElement( 'input' );
	var last_input_value = root.matrix.get([row, col]);
	input.value = last_input_value;
	input.type = "number";
	input.step = "any";
	
	function changeHandler ( event ) {
		var eachBlock1_value = this.__svelte.eachBlock1_value, row__index = this.__svelte.row__index, row = eachBlock1_value[row__index]
		var eachBlock2_value = this.__svelte.eachBlock2_value, col__index = this.__svelte.col__index, col = eachBlock2_value[col__index]
		
		component.change(row, col, event.target);
	}
	
	addEventListener( input, 'change', changeHandler );
	
	input.required = true;
	
	input.__svelte = {
		eachBlock1_value: eachBlock1_value,
		row__index: row__index,
		eachBlock2_value: eachBlock2_value,
		col__index: col__index
	};

	return {
		mount: function ( target, anchor ) {
			insertNode( input, target, anchor );
		},
		
		update: function ( changed, root, eachBlock1_value, row, row__index, eachBlock2_value, col, col__index ) {
			var __tmp;
		
			if ( ( __tmp = root.matrix.get([row, col]) ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
			
			input.__svelte.eachBlock1_value = eachBlock1_value;
			input.__svelte.row__index = row__index;
			input.__svelte.eachBlock2_value = eachBlock2_value;
			input.__svelte.col__index = col__index;
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'change', changeHandler );
			
			if ( detach ) {
				detachNode( input );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var th = createElement( 'th' );
	
	appendNode( createText( "Actions" ), th );

	return {
		mount: function ( target, anchor ) {
			insertNode( th, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( th );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, heading, heading__index, component ) {
	var th = createElement( 'th' );
	
	var last_text = heading
	var text = createText( last_text );
	appendNode( text, th );

	return {
		mount: function ( target, anchor ) {
			insertNode( th, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, heading, heading__index ) {
			var __tmp;
		
			if ( ( __tmp = heading ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( th );
			}
		}
	};
}

function Matrix ( options ) {
	options = options || {};
	
	this._state = options.data || {};
applyComputations( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._torndown = false;
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

Matrix.prototype = template.methods;

Matrix.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Matrix.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Matrix.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

Matrix.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Matrix.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

Matrix.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

Matrix.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	applyComputations( this._state, newState, oldState, false )
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Matrix.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function createText( data ) {
	return document.createTextNode( data );
}

function noop() {}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

return Matrix;

}());