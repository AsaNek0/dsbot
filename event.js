function loadEvents(client) {
    const fs = require('fs');

    const folders = fs.readdirSync('./event');
    for (const folder of folders) {
        const files = fs.readdirSync(`./event`).filter((file) => file.endsWith(".js"));
        

        for (const file of files) {
            const event = require(`./event/${file}`);

            if (event.rest) {
                if(event.once)
                    client.rest.once(event.name, (...args) => 
                    event.execute(...args, client)
                );
                else 
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
            continue;
        }
    }
}

module.exports = {loadEvents}