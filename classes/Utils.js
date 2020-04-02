class Utils {
    static isValidNamespacedBlockName( namespacedBlockName ) {
        const namespacedBlockNameArr = namespacedBlockName.split( '/' );

        if ( 2 !== namespacedBlockNameArr.length
            || namespacedBlockNameArr.filter( val => val.trim().length === 0 ).length > 0 ) {
            return false;
        }

        return namespacedBlockNameArr;
    }
}

module.exports = Utils;
