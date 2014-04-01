var restify = require('restify');

var client = restify.createJsonClient({
    url: 'http://petstore.swagger.wordnik.com:80/api/pet/',
    headers: {},
    connectTimeout: 5000
});


//this is the work function that executes all the internal statements in order
//the signature needs to stay run(function*(resume)) in order work work correctly and the resume needs to be called to advance the sequence.
run(function* syncRest(resume) {

    var results = {};

    console.log(yield client.get('findByStatus', function(err, req, res, obj){ console.log('1:'); resume('a'); results.one=1;  }));
    console.log(yield client.get('findByStatus', function(err, req, res, obj){ console.log('2:'); resume('b'); results.two=2; }));
    console.log(yield client.get('findByStatus', function(err, req, res, obj){ console.log('3:'); resume('c'); results.three=3; }));
    console.log(yield client.get('findByStatus', function(err, req, res, obj){ console.log('4:'); resume('d'); results.four=4; }));
    console.log(yield client.get('findByStatus', function(err, req, res, obj){ console.log('5:'); resume('e'); results.five=5; }));
    console.log(yield client.get('findByStatus', function(err, req, res, obj){ console.log('6:'); resume('f'); results.six=6; }));
    console.log(yield client.get('findByStatus', function(err, req, res, obj){ console.log('7:'); resume('g'); results.seven=7; }));

    console.log(results);

});


//the magic
//this is a function that takes a generator as a parameter
function run(generatorFunction) {

    //call the generator constructor and pass in the resume function as a generator value.
    //the resume function should be called within the generator items when it is ready to move to the next step in the chain.
    //if there are no more resumes being called then the chain will stop.
    var itr = generatorFunction(resume);

    //declare the resume function which takes a callbackValue and which will be returned to the yield call as the value.
    function resume(callbackValue) {
        
        //call the next function on the generator iterator so the sequence will continue.
        //the callback value is what is returned by the yield statement
        itr.next(callbackValue);
    }
   
    //advance the generator iterator one statement
    itr.next();
}
