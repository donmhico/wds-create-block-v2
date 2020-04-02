require( 'should' );
const Scaffold = require( '../classes/Scaffold' );
const {
    DownloadInterface,
    Download
} = require( '../classes/Download' );
const fs = require( 'fs' );

describe( 'Scaffold', function() {
    const downloadInterface = new DownloadInterface( {
        download: ( resolve, reject ) => {
            resolve();
        },
        successFunc: () => {
            // Simulate download by creating directory.
        },
        errorFunc: () => {},
    } );
    const download = new Download( downloadInterface );

    it( 'should throw error if passed namespaced block name is not in proper format', function() {
        ( function() {
            new Scaffold( {
                namespacedBlockName: '  /sample-block',
                directory: './'
            }, download );
        }.should.throw() );
    } );

    it( 'should throw error if download is not passed as 2nd param', function() {
        ( function() {
            new Scaffold( {
                namespacedBlockName: 'WebDevStudios/SampleBlock',
                directory: './'
            } );
        }.should.throw() );
    } );

    it( 'should extract namespace and blockname from passed namespacedBlockName', function() {
        const scaffold = new Scaffold( {
            namespacedBlockName: 'WebDevStudios/SampleBlock',
            directory: './'
        }, download );

        scaffold.namespace.should.eql( 'WebDevStudios' );
        scaffold.blockName.should.eql( 'SampleBlock' );
    } );

    it( 'renameMainPluginFile() should rename the WDS Block Starter plugin file to block-name', function( done ) {
        ( async function() {
            const scaffold = new Scaffold( {
                namespacedBlockName: 'WebDevStudios/SampleBlock',
                directory: './'
            }, download );

            await scaffold.downloadRepo();
            scaffold.renameMainPluginFile();

            fs.access( './sample-block', fs.constants.F_OK, ( err ) => {
                err.should.not.instanceOf( Error );

                done();
            } );

        } )();

    } );
} );
