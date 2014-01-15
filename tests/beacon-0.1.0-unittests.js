test("Test presense of window.Beacon", function(){
   ok( window.Beacon !== null && typeof(window.Beacon) !== 'undefined', "window.Beacon is present"); 
});

asyncTest("Test for adding an event receiver and signaling to the receiver", function(){
   var signaler = {
        doSomething: function() {
            Beacon.signal(this, 'onDoSomething', { result: 1 }, null);   
        }
   };
   
   Beacon.receive(signaler, 'onDoSomething', function(data, error){
        equal(data.result, 1, "Result data is 1");
        start();
   });
   
   signaler.doSomething();
});

test("Test for checking whether an object is a beacon", function(){
   var notabeacon = {};
   equal(Beacon.isBeacon(notabeacon), false, "Beacon.isBeacon should be false.");
   
   var beacon = {};
   Beacon.receive(beacon, 'onDoSomething', function(){ alert('Hello world!'); });
   equal(Beacon.isBeacon(beacon), true, "Beacon.isBeacon should be true.");
});

test("Test for checking whether a signal exists", function(){
   var notabeacon = {};
   equal(Beacon.isSignal(notabeacon, 'notasignal'), false, "A non-beacon should not have a signal.");
   
   var beacon = {};
   Beacon.receive(beacon, 'onDoSomething', function(){ alert('Hello world!'); });
   equal(Beacon.isSignal(beacon, 'onDoSomething'), true, "beacon.onDoSomething is a signal.");
   equal(Beacon.isSignal(beacon, 'onDoSomethingElse'), false, "beacon.onDoSomethingElse is not a signal."); 
});

test("Test for killing a signal", function(){
   var beacon = {};
   Beacon.receive(beacon, 'onDoSomething', function(){ alert('Hello world!'); });
   equal(Beacon.isSignal(beacon, 'onDoSomething'), true, "beacon.onDoSomething is a signal.");
   Beacon.killSignal(beacon, 'onDoSomething');
   equal(Beacon.isSignal(beacon, 'onDoSomething'), false, "beacon.onDoSomething is no longer a signal.");
});