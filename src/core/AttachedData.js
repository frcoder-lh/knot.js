(function(){
    var __private = Knot.getPrivateScope();


    /////////////////////////////////////
    // Attached data management
    /////////////////////////////////////
    __private.AttachedData = {
        _dataInMonitoring: [],
        _attachedInfoOfData: [],

        getAttachedInfo: function(data) {
            if(__private.Setting.enablePropertyHook){
                if(!data.__knot_attachedData){
                    Object.defineProperty(data, "__knot_attachedData", {value:{}, configurable:true, writable:false, enumerable:false});

                }
                return data.__knot_attachedData;
            }
            else{
                if (this._dataInMonitoring.indexOf(data) < 0) {
                    this._dataInMonitoring.push(data);
                    this._attachedInfoOfData[this._dataInMonitoring.indexOf(data)] = {};
                }
                return this._attachedInfoOfData[this._dataInMonitoring.indexOf(data)];
            }
        },
        releaseAttachedInfo: function(data) {
            if(__private.Setting.enablePropertyHook){
                delete data.__knot_attachedData;
            }
            else{
                var index = this._dataInMonitoring.indexOf(data);
                if (index >= 0) {
                    delete this._dataInMonitoring[index];
                    delete this._attachedInfoOfData[index];
                }
            }
        }
    };
})();