/**
 * Created by noargs on 04/07/17.
 */
var generateMessage=(from,text)=>{

  return {

      from,
      text,
      createdAt:new Date().getTime()
  }

};


module.exports={generateMessage};