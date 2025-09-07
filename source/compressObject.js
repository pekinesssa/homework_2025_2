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
const compressObject = function (obj) {
    if (typeof(obj) != "object"){
        return "Это не объект!"
    }
    let newObj = {}
    for (const key in obj){
        const val = obj[key]
        if (val !== null && val !==undefined && val !== ""){
            if (typeof(val) == "object"){
                newObj[key] = compressObject(val)
            } else {
                newObj[key] = val
            }
        }
    }
    console.log("ГЕНА НА ВОТ ТВОЕ ПОЛОТЕНЦЕ", newObj)
    return newObj
}