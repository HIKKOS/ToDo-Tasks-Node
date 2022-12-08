require('colors');
const showMenu = () => {
    return new Promise( resolve => {
        
        console.clear();
        console.log('======================='.cyan);
        console.log(' Selecciona una opción');
        console.log('=======================\n'.cyan);
        console.log(`${ '1'.cyan } .- Crear tarea`)
        console.log(`${ '2'.cyan } .- Listar tareas`)
        console.log(`${ '3'.cyan } .- Listar completadas`)
        console.log(`${ '5'.cyan } .- Completar tarea(s)`)
        console.log(`${ '6'.cyan } .- Borrar tarea`)
        console.log(`${ '0'.cyan } .- Salir\n`)
        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readLine.question('seleccione una opcion para continuar: ', (opt) =>{   
            readLine.close();
            resolve(opt);
        });
        
    })
}

const pause = () => {
    return new Promise( resolve  => {        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readLine.question(`\nPresione ${'ENTER'.cyan} para continuar: \n`, (opt) =>{            
            readLine.close();
            resolve();
        });
    })    
}
module.exports = {
    showMenu,
    pause,
}