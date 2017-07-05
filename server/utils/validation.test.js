/**
 * Created by noargs on 05/07/17.
 */
var expect=require('expect');
var {isRealString}=require('./validation');

describe('Validate Real Strings',()=>{


    it('Should reject non-string values',()=>{

        var res=isRealString(123);
        expect(res).toBe(false);


    });


    it('Should reject string with only space',()=>{

        var res=isRealString("              ");
        expect(res).toBe(false);

    })


    it('Should allow string with non-space characters',()=>{

        var res=isRealString("Amit Kumar");
        expect(res).toBe(true);

    });

});