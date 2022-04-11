class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        console.log(`El nombre del usuario es ${this.nombre} y su apellido es ${this.apellido} `)
    }
    addMascota(newMascota){
        this.mascotas.push(newMascota)
        console.log('Mascotas del usuario: ' + this.mascotas)
    }
    countMascotas(){
        return console.log(`El usuario tiene: ${this.mascotas.length} mascota/s`)
    }
    addBook(libro,escritor){
        this.libros.push({nombre:libro,autor:escritor});
    }
    getBookNames(){
        const bookNames = this.libros.map(libro =>{
            return libro.nombre;
        })
        console.log(bookNames)
    }
}
const user1 = new Usuario('Esteban','Quito',[{nombre:'Mistborn',autor:'Brandon Sanderson'}],['perro']);

user1.getFullName();
user1.addMascota('oso');
user1.countMascotas();
user1.addBook('El Señor de los Anillos','J.R.R Tolkien');
user1.getBookNames();

const user2 = new Usuario('Mia','Miga',[{nombre:'FLOW',autor:'Mihaly Csikszentmihalyi'},{nombre:'The Willpower Instinct',autor:'Kelly McGonigal'}],['gato','canario','delfin']);

user2.getFullName();
user2.addMascota('mono');
user2.countMascotas();
user2.addBook('Game of Thrones: A Song of Ice and Fire','George R.R Martin');
user2.getBookNames();