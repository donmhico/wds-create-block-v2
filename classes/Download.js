/**
 * DownloadInterface
 */
class DownloadInterface {
    /**
     * Download function
     *
     * Accepts (resolve, reject) params. Use `resolve()` if the download succeeds
     * and `reject()` when it fails.
     *
     * @type { function }
     */
    download;

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

/**
 * Download class
 *
 * This class is meant to be an abstraction layer and does not contain an actual "download" logic.
 * You'll provide the download logic as `download` property in the `DownloadInferface` object you passed in instantiation.
 *
 * Example:
 * // Create a DownloadInterface
 * const downloadInterface = new DownloadInterface( {
 *     download: ( resolve, reject ) => {
 *         // Perform download logic.
 *         if ( downloadLogic() ) {
 *            // Call `resolve()` when download is a success to invoked passed successFunc().
 *            resolve();
 *            return;
 *         }
 *
 *         // Call `reject()` when the download fails to invoke passed errorFunc().
 *         reject();
 *     },
 *     successFunc: () => {
 *          // Perform actions when download succeeds.
 *     },
 *     errorFunc: () => {
 *          // Perform actions when download fails.
 *     }
 * } );
 */
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
