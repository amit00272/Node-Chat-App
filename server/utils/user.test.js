/**
 * Created by noargs on 05/07/17.
 */
var expect=require('expect');
var {Users}=require('./user');

describe('Users',()=>{

    var users;

    beforeEach(()=>{

        users=new Users();
        users.users=[{
            id:'1',
            name:'Amit',
            room:'Node Course'
            },{

            id:'2',
            name:'Mohit',
            room:'Java Course'

            },{

            id:'3',
            name:'Sumit',
            room:'Node Course'

            }];

    });

    it('Should Add new Users',()=>{

       var users=new Users();
       var user={
           id:'123',
           name:'Amit',
           room:"amit room"

       };
       var resUser=users.addUser(user.id,user.name,user.room);
       expect(users.users).toEqual([user]);



    });


    it('Should Return Name for node course',()=>{

        var userList=users.getUsersList('Node Course');

        expect(userList).toEqual(['Amit','Sumit']);


    });

    it('Should Return Name for Java course',()=>{

        var userList=users.getUsersList('Java Course');

        expect(userList).toEqual(['Mohit']);


    });



    it('Should Remove a user',()=>{


        var user=users.removeUser('2');
        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    });



    it('Should Not Remove a user',()=>{



        var user=users.removeUser('20');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });



    it('Should Find a user',()=>{

        var userId='2';
        var user=users.getUser(userId);
        expect(user.id).toBe(userId);

    });

    it('Should Not Find a user',()=>{

        var userId='20';
        var user=users.getUser(userId);
        expect(user).toNotExist();

    });

});