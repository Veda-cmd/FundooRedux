/**
* @description: 
* @file: cache.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const redis = require('redis');
const redisClient = redis.createClient();
const logger = require('./log');

/**
*@description Redis connection is initialized. Redis is an open source (BSD licensed), 
* in-memory data structure store, used as a database, cache and message broker. 
*/

redisClient.on('connect',()=>
{
    logger.info('Redis client connected');
})
redisClient.on('error',(err)=>
{
    logger.error('Something went wrong ' + err);
})

class cacheService
{
    /**
    *@description Key value pair is set in Redis.
    */ 

    set(key,value,callback)
    {
        redisClient.set(key,value,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        })
    }

    /**
    *@description Key value pair is retreived from Redis.
    */

    get(key,callback)
    {
        redisClient.get(key,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        });
    }

    /**
    *@description Key is deleted from Redis.
    */

    delete(key,callback)
    {
        redisClient.del(key,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        });
    }

    /**
    *@description To see if a key exists in redis or not.
    */

    exist(key,callback)
    {
        redisClient.exists(key,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        });
    }
}

module.exports = new cacheService();