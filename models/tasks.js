const Task = require("./task");
class Tasks{
    _listado = {};
    constructor(){
        this._listado = {};
    }
    deleteTask(id = 'vacio'){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }
    crearTarea( desc = '' ){
        const task = new Task(desc);
        this._listado[task.id] = task;
    }
    get listArry(){
        const list = [];
        Object.keys(this._listado).forEach( key => list.push(this._listado[key]));
        return list;
    }
    listView(){
        this.listArry.forEach( (e, i ) => {
            const ix = `${i + 1}`.cyan;
            const {description, completedOn} = e;
            const state = completedOn
                ? 'Completado'.cyan
                : 'Pendiente'.red
            console.log(`${ix} .- ${description} :: ${state}`)
        })
    }
    listByState(completed = true){
        let ix = 1;
        this.listArry.forEach( (e) => {
            const {description, completedOn} = e;
            const state = completedOn
                ? 'Completado'.cyan
                : 'Pendiente'.cyan
            if(completed){
                if(completedOn){
                    console.log(`${ix}`.cyan + `.- ${description} :: ${completedOn}`)
                    ix ++;
                }
            } else {
                if(!completedOn){
                    console.log(`${ix}`.cyan + `.- ${description} :: ${state}`)
                    ix ++;
                }
            }
        })
    }
    loadDataFromArr( tasks = [] ){
        tasks.forEach( t => {
            this._listado[t.id] = t;
        })
    }
    toggleCompleted(ids = [] ){
        ids.forEach(id => {
            const task = this._listado[id];
            if( !task.completedOn )
                task.completedOn = new Date().toISOString();
        })
        this.listArry.forEach( tarea => {
            if ( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completedOn = null;
            }
        })
    }
}

module.exports = Tasks;