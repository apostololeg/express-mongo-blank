exports.extend = function(target, source) {

    for (var i in source) {
        target[i] = source[i];
    }

    return target;

};
