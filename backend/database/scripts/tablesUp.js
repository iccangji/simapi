const { logger } = require('../../utils/logger');
const {
    createTableUSers: createTableUSersQuery,
    createTableAlat: createTableAlatQuery,
    createTableHistory: createTableHistoryQuery
} = require('../queries');

(() => {
    require('../../config/db.config').query(createTableUSersQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
        // process.exit(0);
    });
    require('../../config/db.config').query(createTableAlatQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table alat created!');
        // process.exit(0);
    });
    require('../../config/db.config').query(createTableHistoryQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table history created!');
        process.exit(0);
    });
})();
