const Utils = require( '../classes/Utils' );
const assert = require( 'assert' );

describe( 'Utils', function (){
    it( 'isValidNamespacedBlockName should return false if passed arg is not following <Namespace>/<BlockName> format', function() {
        assert.equal( Utils.isValidNamespacedBlockName( 'sampleBlock' ), false );
        assert.equal( Utils.isValidNamespacedBlockName( '/sample-block' ), false );
        assert.equal( Utils.isValidNamespacedBlockName( 'sample/' ), false );
        assert.equal( Utils.isValidNamespacedBlockName( '    sample' ), false );
        assert.equal( Utils.isValidNamespacedBlockName( '  /  sample' ), false );

        assert.deepEqual( Utils.isValidNamespacedBlockName( 'WebDevStudios/SampleBlock' ), [
            'WebDevStudios',
            'SampleBlock'
        ] );
    } );
} );
