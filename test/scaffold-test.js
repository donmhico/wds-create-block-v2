require( 'should' );
const Scaffold = require( '../classes/Scaffold' );
const {
    DownloadInterface,
    Download
} = require( '../classes/Download' );
const fs = require( 'fs' );
const fsPromises = require( 'fs' ).promises;

describe( 'Scaffold', function() {

    const wdsBlockStarterDirectory = './sample-block';
    const wdsBlockStarterMainFile  = `${ wdsBlockStarterDirectory }/wds-block-starter.php`;

    const downloadInterface = new DownloadInterface( {
        download: ( resolve, reject ) => {
            // Simulate download by creating directory.
            fs.mkdir( wdsBlockStarterDirectory, {}, ( err ) => {
                    if ( err ) throw err;

                    // Then create a sample wds-block-starter.php file.
                    fs.writeFile( wdsBlockStarterMainFile, 'Hello Node.js', 'utf8', ( error ) => {
                        if ( error ) throw error;
                        resolve();
                    } );
                }
            );
        },
        successFunc: () => {},
        errorFunc: () => {},
    } );
    const download = new Download( downloadInterface );

    afterEach( async function() {
        // Check if the generated directory and file exists.
        await fsPromises.access( `${ wdsBlockStarterDirectory }/sample-block.php`, fs.constants.F_OK );
        // Remove the generated directory.
        await fsPromises.rmdir( wdsBlockStarterDirectory, { recursive: true } );
    } );

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
            directory: wdsBlockStarterDirectory
        }, download );

        scaffold.namespace.should.eql( 'WebDevStudios' );
        scaffold.blockName.should.eql( 'SampleBlock' );
    } );

    it( 'renameMainPluginFile() should rename the WDS Block Starter plugin file to block-name', function( done ) {
        ( async function() {
            const scaffold = new Scaffold( {
                namespacedBlockName: 'WebDevStudios/SampleBlock',
                directory: wdsBlockStarterDirectory
            }, download );

            await scaffold.downloadRepo();
            await scaffold.renameMainPluginFile();

            fs.access( `${ wdsBlockStarterDirectory }/sample-block.php`, fs.constants.F_OK, ( err ) => {
                should.not.exist( err );
                done();
            } );

        } )();

    } );
} );
