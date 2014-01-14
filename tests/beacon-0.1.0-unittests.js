test("Test presense of window.Beacon", function(){
   ok( window.Beacon !== null && typeof(window.Beacon) !== 'undefined', "window.Beacon is present"); 
});

asyncTest("Test for adding an event receiver and signaling to the receiver", function(){
   var signaler = {
        doSomething: function() {
            Beacon.signal(this, 'onDoSomething', { result: 1 }, null);   
        }
   }
   
   Beacon.receive(signaler, 'onDoSomething', function(data, error){
        equal(data.result, 1, "Result data is 1");
        start();
   });
   
   signaler.doSomething();
});