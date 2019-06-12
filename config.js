
let env = process.env.NODE_ENV || 'development';


/**
 * configure js file for app configuration management
 */
let config = {};


/**
 * Here I am creating just development environemnt configuration, 
 * we can create test and production also for testing and production environment
 */
config.development = {

    'databaseUrl': 'mongodb://casa_one:casa123@ds141815.mlab.com:41815/casa_one',
    'userSecretKey': 'userJwtVeryLongSecretKey',
    'adminSecretKey': 'adminJwtVeryLongSecretKey'
}



global._config = config[env];