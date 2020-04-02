const { program }     = require( 'commander' );
const downloadGitRepo = require( 'download-git-repo' );
const { version }     = require( './package' );
const fs              = require( 'fs' );
const {
    DownloadInterface,
    Download
} = require( './classes/Download' );

const commandName = 'create-block';

// WDS Block Starter repo.
const WDSBlockStarterRepo = 'WebDevStudios/wds-block-starter';

program
    .name( commandName )
    .version( version )
    .arguments( '[blockName]' )
    .action( async ( blockName ) => {
        if ( ! blockName ) {
            // TODO - Guide the user.
            console.error( 'No Blockname' );
            process.exit( 1 );
        }

        // TODO - Sanitize the blockName.
        // Download the repo using the blockName.
        try {
            const downloadInterfaceArg = {
                repo: WDSBlockStarterRepo,
                successFunc: ( blockName ) => renameMainPluginFile( blockName ),
                errorFunc: ( err ) => console.log( err ),
                download: ( resolve, reject ) => {
                    return downloadGitRepo( WDSBlockStarterRepo, `./${blockName}`, {}, function( err ) {
                        if ( err ) {
                            reject( err );
                            return;
                        }

                        resolve( blockName );
                    } );
                },
            };

            const downloadInterface = new DownloadInterface( downloadInterfaceArg );
            const download = new Download( downloadInterface );
            await download.download();

        } catch ( e ) {
            console.log( "Error:", e );
        }
    } )
    .parse( process.argv );

// Rename the main plugin file.
function renameMainPluginFile( blockName ) {
    return fs.rename( `./${ blockName }/wds-block-starter.php`, `./${ blockName }/${ blockName }.php`, ( err ) => {
        if ( err ) {
            throw `'Error in renaming: ${ err }`
        }
    } );
}
