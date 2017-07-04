/**
 * Created by noargs on 04/07/17.
 */


var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{

    it('should generate a correct message object',()=>{

       var result=generateMessage("Amit","hiAll");

       expect(result.createdAt).toBeA('number');
       expect(result.from).toEqual("Amit");
       expect(result.text).toEqual("hiAll");
    });


});


describe('generateLocationMessage',()=>{

    it('should generate a correct location object',()=>{

        var result=generateLocationMessage("Amit",28,77);

        expect(result.createdAt).toBeA('number');
        expect(result.from).toEqual("Amit");
        expect(result.url).toEqual("https://www.google.com/maps?q=28,77");
    });


});