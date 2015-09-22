Beacon = Beacon || {};

(function(B) {
    var signals = {};
    var nextReceiverId = -1;
    
    B.receive = function(signalName, callback) {
        if(!signals[signalName]) {
            signals[signalName] = [];
        }
        var callbackId = ++nextReceiverId;
        signals[signalName].push({receiverId: callbackId, callback: callback});
        return callbackId;
    };
    
    B.signal = function(signalName, data, error) {        
        if(signals[signalName]) {
            var length = signals[signalName].length;
            
            for(var i = 0; i < length; i++) {
                var cb = signals[signalName][i];
                if(cb !== null && typeof cb.callback === 'function') {
                    cb.callback(data, error);
                }
            }
        }
        return this;
    };
    
    B.isSignal = function(signalName) {
        return signals.hasOwnProperty(signalName);
    };

    B.killReceiver = function(signalName, receiverId) {
        if(signals[signalName]) {
            var length = signals[signalName].length;

            for(var i = 0; i < length; i++) {
		if(signals[signalName][i].receiverId === receiverId) {
                    signals[signalName].splice(i, 1);
                    break;
                }
            }
        }
        return this;
    };    

    B.killSignal = function(signalName) {
        if(signals[signalName]) {
            signals[signalName] = null;
            delete signals[signalName];
        }
        return this;
    };
    
    return B;
}(Beacon));



