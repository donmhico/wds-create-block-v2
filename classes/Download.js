/**
 * DownloadInterface
 */
class DownloadInterface {
    /**
     * Download function
     *
     * Accepts (resolve, reject) params. Use `resolve()` when the download success
     * and `reject()` when it fails.
     *
     * @type { function }
     */
    download;

    /**
     * Repository to download
     *
     * @type { string }
     */
    repo;

    /**
     * Invoked when the download succeeds
     *
     * Accepts a success object param.
     *
     * @type { function }
     */
    successFunc;

    /**
     * Invoked when the download fails
     *
     * Accepts a error object param.
     *
     * @type { function }
     */
    errorFunc;

    constructor( args ) {
        // All DownloadInterface properties are required.
        for ( let property in this ) {
            if ( ! this.hasOwnProperty( property ) ) {
                continue;
            }

            if ( ! args.hasOwnProperty( property ) ) {
                throw `Missing property: ${ property }`;
            }
        }

        Object.assign( this, args );
    }
}

class Download {
    /**
     * @type { DownloadInterface }
     */
    downloadInterface;

    /**
     *
     * @param { DownloadInterface } args
     */
    constructor( args ) {
        if ( ! ( args instanceof DownloadInterface ) ) {
            throw "Not DownloadInterface";
        }

        this.downloadInterface = args;
    }

    download() {
        const promise = new Promise( ( resolve, reject ) => this.downloadInterface.download( resolve, reject ) );

        return promise
            .then( data => this.downloadInterface.successFunc( data ) )
            .catch( err => this.downloadInterface.errorFunc( err ) );
    }
}

module.exports = { DownloadInterface, Download };
