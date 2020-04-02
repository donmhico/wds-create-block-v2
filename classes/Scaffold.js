const Utils = require( './Utils' );
const fs = require( 'fs' );
const {
    DownloadInterface,
    Download
} = require( './Download' );

class Scaffold {
    /**
     * Passed argument on instantiation.
     *
     * @type { string }
     */
    namespacedBlockName;

    /**
     * @type { string }
     */
    directory;

    /**
     * <Namespace> part of namespacedBlockName.
     *
     * @type { string }
     */
    namespace;

    /**
     * <BlockName> part of namespacedBlockName.
     *
     * @type { string }
     */
    blockName;

    /**
     * @type { Download }
     */
    download;

    /**
     *
     * @type { Object }
     * @type { Download }
     */
    constructor( args, download ) {
        // TODO - handle no namedspacedBlockName
        // Make sure that the passed name is in the format <Namespace>/<BlockName>
        const validNamespacedBlockName = Utils.isValidNamespacedBlockName( args.namespacedBlockName );
        if ( ! validNamespacedBlockName ) {
            throw( 'Block name should follow the convention <Namespace>/<BlockName>' );
        }

        if ( ! ( download instanceof Download ) ) {
            throw( 'Second parameter should be a Download object' );
        }

        this.namespacedBlockName = args.namespacedBlockName;
        this.namespace = validNamespacedBlockName[0];
        this.blockName = validNamespacedBlockName[1];
        this.download  = download;
    }

    async downloadRepo() {
        await this.download.download();
    }

    renameMainPluginFile() {
        const wdsBlockStarterMainPluginFile = 'wds-block-starter.php';
    }
}

module.exports = Scaffold;
