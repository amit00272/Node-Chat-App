/**
 * Created by noargs on 04/07/17.
 */


var expect=require('expect');
var {generateMessage}=require('./message');

describe('generateMessage',()=>{

    it('should generate a correct message object',()=>{

       var result=generateMessage("Amit","hiAll");

       expect(result.createdAt).toBeA('number');
       expect(result.from).toEqual("Amit");
       expect(result.text).toEqual("hiAll");
    });


});