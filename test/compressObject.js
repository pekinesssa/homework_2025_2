'use strict';

QUnit.module("Тестируем функцию compressObject", function() {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками", function(assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        assert.deepEqual(result, { name: "Андрей", country: "Россия" }, "Все отлично, вернулось: { name: 'Андрей', country: 'Россия' }");
    });

    QUnit.test("Работает с объектом без ненулевых значений", function(assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Все отлично, объект без ненулевых значений вернул пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Все отлично, пустой объект вернул пустой объект.");
    });

    QUnit.test("Работает со спамом undefined и числами", function(assert) {
        const result = compressObject({
            a: undefined,
            b: undefined,
            c: undefined,
            d: undefined,
            e: undefined,
            f: 1,
            j: 25,
            h: 9,
            i: 0
        });

        assert.deepEqual(result, {f: 1, j: 25, h: 9, i: 0}, "Все отлично, вернулись только числы: {f: 1, j: 25, h: 9, i: 0}.");
    });

    QUnit.test("Работает с типом данных boolean ", function(assert) {
        const result = compressObject({
            a: true,
            b: false,
            c: false,
            d: false,
            e: true
        });

        assert.deepEqual(result, {a: true, b: false, c: false, d: false, e: true}, "Все отлично, работает с типом данных boolean: {a: true, b: false, c: false, d: false, e: true}.");
    });

    QUnit.test("Работает с типами данных", function(assert) {
        const result = compressObject({
            name: "Андрей",
            surname: " ",
            age: 44, 
            shoe: null,
            parents: undefined,
            marryed: false,
            money: Infinity,
            children: NaN,
            Iq: 0
        })

        assert.deepEqual(result, {
            name: "Андрей",
            surname: " ",
            age: 44, 
            marryed: false,
            money: Infinity,
            children: NaN,
            Iq: 0
        }, "Все отлчино, работает с типами данных: {name: 'Андрей', surname: ' ', age: 44, marryed: false, money: Infinity, children: NaN, Iq: 0}")
    })
    
    QUnit.test("Проверка на вложенные объекты", function(assert) {
        const result = compressObject({
            name: "Германия",
            language: "немецкий",
            capital:{     
                name: "Берлин",
                population: null,
                year: 1237
            }
        })

        assert.deepEqual(result, {
            name: "Германия",
            language: "немецкий",
            capital:{     
                name: "Берлин",
                year: 1237
            }
        }, "Все отлчино, работает с вложенными объектами")
    })

    
    QUnit.test("Проверка на работу с прототипами", function(assert) {
        const animal = {
            name: "meow",
            data: undefined
        }
    
        const rabbit = {
            jump: true
        }
        rabbit.__proto__ = animal;
        
        const result = compressObject(rabbit);

        assert.deepEqual(result, {  
            jump: true
        }, "Все отлчино, не работает с унаследованными от прототипа свойствами")
    })

    QUnit.test("Проверка на строки и ошибки", function(assert) {
        try {
            const result = compressObject('meow')
            assert.deepEqual(result, {error: "Тут должна быть ошибка:)"}, "Все отлчино не работает:)")
        } catch (error) { assert.deepEqual({
                name: error.name,
                message: error.message
            },
            {
                name: "TypeError",
                message: "Это не объект!"
            }, "Все отлчино, не работает со строками")
        }
    })

    QUnit.test("Проверка на массивы и ошибки", function(assert) {
        try {
            const result = compressObject([1, 2, 3])
            assert.deepEqual(result, {error: "Тут должна быть ошибка:)"}, "Все отлчино не работает:)")
        } catch (error) { assert.deepEqual({
                name: error.name,
                message: error.message
            },
            {
                name: "TypeError",
                message: "Это не объект!"
            }, "Все отлчино, не работает с массивами")
        }
    })

});
