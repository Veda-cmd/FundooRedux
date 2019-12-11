/**
* @description: 
* @file: cache.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const redis = require('../services/cache');
const logger = require('../services/log');

class cacheController
{
    /**
    *@description cacheNotes API is used for retrieving list of all notes in cache.
    */

    cacheNotes(req,res,next)
    {
        let key = 'getAllNotes'+req.decoded.email;

        // get method is used for retreiving data from redis
        redis.get(key,(err,data)=>
        {
            if(err)
            {
                res.status(422).send(err);
            }
            else
            {
                if(data == null)
                {
                    logger.info('Data not found in cache');
                    next();
                }
                else
                {
                    logger.info('Data found in cache');
                    res.status(200).send(JSON.parse(data));
                }
            }
        });
    }

    /**
    *@description cacheListings API is used for retreiving list of notes according to listings.
    */

    cacheListings(req,res,next)
    {      
        let key = Object.keys(req.query)[0]+req.decoded.email;
        logger.info(key);
        
        // get method is used for retreiving data from redis.
        redis.get(key,(err,data)=>
        {
            if(err)
            {
                res.status(422).send(err);
            }
            else
            {
                if(data == null)
                {
                    logger.info('Data not found in cache');
                    next();
                }
                else
                {
                    logger.info("Fetched from cache");
                    res.status(200).send(JSON.parse(data));
                }
            }
        });
    }
}

module.exports = new cacheController();