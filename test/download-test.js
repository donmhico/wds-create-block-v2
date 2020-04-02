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
            successFunc: 'sample',
            errorFunc: 'micmico'
        };

        const downloadInterface = new DownloadInterface( args );

        Object.keys( downloadInterface ).should.be.eql( Object.keys( args ) );
        Object.values( downloadInterface ).should.be.eql( Object.values( args ) );

    } );
} );

describe( 'Download', function() {
    it( 'should throw an error if passed argument is not instance of DownloadInterface', function() {
        ( function() {
            new Download( 'WDS' )
        }.should.throw() );
    } );

    it( 'resolved promise should call successFun', function( done ) {
        ( async function() {
            let sampleVar = 1;

            const args = {
                download: ( resolve, reject ) => {
                    resolve( 2 );
                },
                successFunc: ( data ) => {
                    sampleVar = data;
                },
                errorFunc: 'micmico'
            };

            const downloadInterface = new DownloadInterface( args );
            const download = new Download( downloadInterface );

            await download.download();
            sampleVar.should.eql( 2 );
            done();
        } )();
    } );

    it( 'rejected promise should call errorFunc', function( done ) {
        ( async function() {
            let sampleVar = 10;

            const args = {
                download: ( resolve, reject ) => {
                    reject( 33 );
                },
                errorFunc: ( err ) => {
                    sampleVar = err;
                },
                successFunc: () => {
                    sampleVar = 20;
                },
            };

            const downloadInterface = new DownloadInterface( args );
            const download = new Download( downloadInterface );

            await download.download();
            sampleVar.should.eql( 33 );
            done();
        } )();
    } );
} );
