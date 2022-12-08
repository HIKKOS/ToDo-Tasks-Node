const inquirer = require('inquirer');
require('colors');
const pregunta = [
    {
        type: 'list',
        name: 'option',
        message:'¿que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.-'.cyan} Crear tarea`
            },
            {
                value: 2,
                name: `${'1.-'.cyan} Listar tareas`
            },
            {
                value: 3,
                name: `${'3.-'.cyan} Listar tareas completadas`
            },
            {
                value: 4,
                name: `${'4.-'.cyan} Listar tareas pendientes`
            },
            {
                value: 5,
                name: `${'5.-'.cyan} Completar tara(s)`
            },
            {
                value: 6,
                name: `${'6.-'.cyan} Borrar tarea`
            },
            {
                value: 0,
                name: `${'0.-'.cyan} Salir`
            },
        ],
    }
]
const confirm = async( message ) => {
    const quest = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(quest);
    return ok;
}
const ListTaskToDelete = async( tasks = [] ) => {
    const choices = tasks.map( (task, i)  => {
        const idx = `${i + 1}`.cyan;
        return {
            value: task.id,
            name: `${idx}.- ${task.description}`
        }
    });    
    choices.unshift({
        value: 0,
        name: '0.- '.cyan + 'salir'
    })
    const quest = [
        {
            type:'list',
            //name = lo que quieres deesctructurar
            name: 'id',
            message: '¿Cuál quiere borrar?',
            choices
        }
    ]
   
    //ESTO!!!!!!!!
    const { id } = await inquirer.prompt(quest);
    return id;

}

const inquirerMenu = async() =>{      
    //console.clear();
    console.log('======================='.cyan);
    console.log(' Selecciona una opción');
    console.log('=======================\n'.cyan);
    const { option } = await inquirer.prompt(pregunta);    
    return option;
}
const pause = async() => {   
    const quest = [
        {
            type:'input',
            name: 'enter',
            message: `Presione ${ 'enter'.cyan } para continuar\n `
        }
    ]
    console.log('\n')
    await inquirer.prompt(quest);
}
const read = async(message) => {
    const quest = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0){
                    return 'ingrese un valor'
                }
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(quest);
    return desc;
}
const ListTaskCheckbox = async( tasks = [] ) => {
    const choices = tasks.map( (task, i)  => {
        const idx = `${i + 1}`.cyan;
        return {
            value: task.id,
            name: `${idx}.- ${task.description}`,
            checked : task.completedOn ? true : false
        }
    });    
    
    const quest = [
        {
            type:'checkbox',
            //name = lo que quieres deesctructurar
            name: 'ids',
            message: 'Selccione las tareas',
            choices
        }
    ]
   
    //ESTO!!!!!!!!
    const { ids } = await inquirer.prompt(quest);
    return ids;

}
module.exports = {
    inquirerMenu,
    pause,
    read,
    ListTaskToDelete,
    confirm,
    ListTaskCheckbox,
}