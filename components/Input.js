var Input = (function () { 'use strict';

var template = (function () {
  return {
    methods: {
      change (target) {
        this.set({'value':parseFloat(target.value)});
      }
    }
  }
}());

function renderMainFragment ( root, component ) {
	var last_text = root.description
	var text = createText( last_text );
	var text1 = createText( " " );
	
	var input = createElement( 'input' );
	input.type = "number";
	var last_input_min = root.minimum;
	input.min = last_input_min;
	var last_input_step = root.step;
	input.step = last_input_step;
	var last_input_value = root.value;
	input.value = last_input_value;
	
	function inputHandler ( event ) {
		component.change(event.target);
	}
	
	addEventListener( input, 'input', inputHandler );
	
	function changeHandler ( event ) {
		component.change(event.target);
	}
	
	addEventListener( input, 'change', changeHandler );

	return {
		mount: function ( target, anchor ) {
			insertNode( text, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( input, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.description ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			if ( ( __tmp = root.minimum ) !== last_input_min ) {
				last_input_min = __tmp;
				input.min = last_input_min;
			}
			
			if ( ( __tmp = root.step ) !== last_input_step ) {
				last_input_step = __tmp;
				input.step = last_input_step;
			}
			
			if ( ( __tmp = root.value ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'input', inputHandler );
			removeEventListener( input, 'change', changeHandler );
			
			if ( detach ) {
				detachNode( text );
				detachNode( text1 );
				detachNode( input );
			}
		}
	};
}

function Input ( options ) {
	options = options || {};
	
	this._state = options.data || {};

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

Input.prototype = template.methods;

Input.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Input.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Input.prototype.observe = function observe( key, callback, options ) {
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

Input.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Input.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

Input.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

Input.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Input.prototype.teardown = function teardown ( detach ) {
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

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function createElement( name ) {
	return document.createElement( name );
}

return Input;

}());