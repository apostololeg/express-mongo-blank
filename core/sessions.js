var express = require('express'),
    memoryStore = new express.session.MemoryStore();

exports.memoryStore = memoryStore;
