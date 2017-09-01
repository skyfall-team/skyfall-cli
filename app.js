#!/usr/bin/env node
var app = {
    chalk       : require('chalk'),
    clear       : require('clear'),
    figlet      : require('figlet'),
    program     : require('commander'),
    co          : require('co'),
    fileutils   : require('./utils/file.utils')(),
    prompt      : require('co-prompt')
};

  app.clear();
  console.log(app.chalk.bold.yellow(app.figlet.textSync('SkyfallJS', { horizontalLayout: 'full' })));

  var files = app.fileutils._getAllFilesFromFolder(__dirname + '/command/');
  var memCommand = [];

  for(var i=0; i < files.length; i++){
    try {
      var cmd = require(files[i])(app);
      memCommand.push(cmd);
      app.program.option(cmd.command+', '+cmd.flag,cmd.description);
    } catch(e) {
      console.log(app.chalk.red('Erro: ' + e));
    }
  }

  app.program.parse(process.argv);

  //bootstrap do comando.
  for(var i=0; i < memCommand.length;i++){
    var fu = eval('app.program.'+memCommand[i].flag.replace('--',''));
    if(fu){
      memCommand[i].bootstrap();
      return;
    }
  }

  //caso não digite nenhum opção eu mostro o helper
  if(!app.program.args.length) {
    app.program.help();
  }
  