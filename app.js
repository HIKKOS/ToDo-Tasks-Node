require('colors');
const Task = require('./models/task');
const Tasks = require('./models/tasks');
//const { showMenu,pause } = require('./helpers/mensajes');
const { 
    inquirerMenu, 
    pause,
    read,
    ListTaskToDelete,  
    confirm,
    ListTaskCheckbox,
} = require('./helpers/inquirer');
const {saveData, readData } = require('./helpers/saveTxt');

console.clear();
const main = async() =>{
    let opt;
    const tasks = new Tasks();
    const tareasDB = readData();
    if( tareasDB ) {    
        tasks.loadDataFromArr(tareasDB);
    }    
    do{
        console.clear();   
       /*  console.log(tasks.listArry)
        await pause() */;    
        opt = await inquirerMenu();   
        switch (opt) {
            case 1:
                const desc = await read('Descripcion');
                tasks.crearTarea( desc );
                console.log(desc)
                break;                   
            case 2:
                tasks.listView();
                break;                   
            case 3:        
                tasks.listByState();        
                break;                   
            case 4:                
                tasks.listByState(false);        
                break;                   
            case 5:                
                const ids = await ListTaskCheckbox(tasks.listArry);       
                tasks.toggleCompleted( ids )
                break;                   
            case 6:                
                const id = await ListTaskToDelete(tasks.listArry)
                if(id !== 0 ){    
                    const ok = await confirm('¿ Lo quiere borrar ?');
                    if( ok ) {
                        tasks.deleteTask(id);
                        console.log('Tarea Borrada');                    
                    }
                    break;                   
                }
        }
        saveData( tasks.listArry );
        await pause();
    } while(opt != 0);   
}
main();