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
                if(callback !== null && typeof callback === 'function') {
                    callback(data, error);
                }
            }
        }
    };
    
    B.isBeacon = function(scopeObj) {
        return getScopeIndex(scopeObj) >= 0;
    }
    
    B.isSignal = function(scopeObj, signalName) {
        var scopeIndex = getScopeIndex(scopeObj);
        if(scopeIndex === -1) return false;
        
        return signals[scopeIndex].hasOwnProperty(signalName);
    };
    
    B.killBeacon = function(scopeObj) {
        var scopeIndex = getScopeIndex(scopeObj);
        if(scopeIndex === -1) return;
        
        if(signals[scopeIndex]) {
            signals.splice(scopeIndex, 1);
        }
    };
    
    B.killSignal = function(scopeObj, signalName) {
        var scopeIndex = getScopeIndex(scopeObj);
        if (scopeIndex === -1) return;
        
        if(signals[scopeIndex][signalName]) {
            signals[scopeIndex][signalName] = null;
            delete signals[scopeIndex][signalName];
        }
    };
    
    return B;
}(window.Beacon);



