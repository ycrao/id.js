#!/usr/bin/env node

/**
 * usage
 * 
 * id-parse 42032319930606629x
 * id-parse 42032319930606629x
 */
var program = require('commander');
program.version('1.0.0').parse(process.argv);

program.on('--help', function(){
    console.log('    {identity card number}  Get identity card number information');
    console.log('');
    console.log('  Example:');
    console.log('');
    console.log('    id-parse 42032319930606629x');
    console.log('');
});

if (program.args.length > 0) {
    let idCard = program.args[0];
    console.log('identity card number is', idCard);
    let id = require('../index');
    let idc = new id.IdentityCard(idCard);
    if (idc.validate()) {
        info = idc.info();
        console.log(info);
    } else {
        console.error(idc._err);
    }
} else {
    program.outputHelp();
}

