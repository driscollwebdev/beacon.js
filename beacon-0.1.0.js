window.Beacon = {};

window.Beacon = function(B) {
    var beacons = [];
    var signals = [];
    
    var getScopeIndex = function(scopeObj){
        return beacons.indexOf(scopeObj);    
    };
    
    B.receive = function(scopeObj, signalName, callback) {
        var scopeIndex = getScopeIndex(scopeObj);
        if(scopeIndex === -1) {
            beacons.push(scopeObj);
            scopeIndex = beacons.length - 1;
            signals[scopeIndex] = {};
        }
        if(!signals[scopeIndex][signalName]) {
            signals[scopeIndex][signalName] = [];
        }
        signals[scopeIndex][signalName].push(callback);
    };
    
    B.signal = function(scopeObj, signalName, data, error) {
        var scopeIndex = getScopeIndex(scopeObj);
        if (scopeIndex === -1) return;
        
        if(signals[scopeIndex][signalName]) {
            var length = signals[scopeIndex][signalName].length;
            
            for(var i = 0; i < length; i++) {
                var callback = signals[scopeIndex][signalName][i];
                callback(data, error);
            }
        }
    };
    
    return B;
}(window.Beacon);



