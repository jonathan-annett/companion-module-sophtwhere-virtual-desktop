const virtualDesktop = require ("virtual-desktop-node");

 
 virtualDesktop.startManager ( ).then(function(desktops){

    const logger = console.info.bind(console);
    const errors = console.error.bind(console);

    desktops.on('change',logger);

    desktops.on('variable',logger);

    desktops.names().then(logger).catch(errors);

    desktops.goto(1).then(logger).catch(errors);


 });
