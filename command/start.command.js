module.exports = function (app) {
    self = this;
    self.command = '-s';
    self.flag  = '--start';
    self.description = 'Start the new SkyfallJS Application.';
    
    self.bootstrap = function() {
        console.log('oieee');
    }

    return self;
};