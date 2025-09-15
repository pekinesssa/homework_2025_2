'use strict';

/**
 * Функция, принимающая объект и возвращающая новый объект, содержащий только те ключи, которые имеют значения, отличные от null, undefined или пустой строки.
 * @param {Object} obj - подаваемый объект
 * 
 * @example
 * // returns {name: "Андрей", country: "Россия"}
 * compressObject({name: "Андрей", age: null, city: "", country: "Россия", occupation: undefined});
 * 
 * @returns {Object} newObject - новый объект без null, undefined, "". 
 */
const compressObject=(obj)=>{
    if (obj === null || typeof(obj) !== "object" || Array.isArray(obj)){
        throw new TypeError('Это не объект!')   
    }   
    return Object.entries(obj).reduce((newObj, [key, val]) => {
        if ( val != null && val !== ""){
            if (typeof(val) === "object"){
                newObj[key] = compressObject(val)
            } else if (Object.prototype.hasOwnProperty.call(obj, key)){
                newObj[key] = val
            }
        }
        return newObj
    }, {})
}