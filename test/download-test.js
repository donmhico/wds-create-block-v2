var should = require( 'should' );
const {
    DownloadInterface,
    Download
} = require( '../classes/Download' );

describe( 'DownloadInterface', function() {
    it( 'should throw an error when DownloadInterface properties are not found in passed args', function() {
        ( function() {
            new DownloadInterface( {} );
        }.should.throw() );
    } );

    it( 'should return the exact same keys and values as the passed args', function() {
        const args = {
            download: 1,
            repo: 'WDS/Create-Block',
            successFunc: 'sample',
            errorFunc: 'micmico'
        };

        const downloadInterface = new DownloadInterface( args );

        Object.keys( downloadInterface ).should.be.eql( Object.keys( args ) );
        Object.values( downloadInterface ).should.be.eql( Object.values( args ) );

    } );
} );
