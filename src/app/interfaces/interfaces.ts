export interface Usuario {
    ID: string,
    NOMBRE: string,
    EMAIL: string,
    PASSWORD: string,
    ROL: string,
    AVATAR: string,
    PUNTOS: number
}

export interface Reto {
    ID: string,
    TITULO: string,
    DESCRIPCION: string,
    TIPO: string,
    NIVEL: string,
    ACTIVO: boolean,
    DESTACADO: boolean,
    RETADOR: string,
    IMAGEN: string,
}

export interface Favorito {
    ID_RETO: string;
    ID_FAV: string;
    USER: string;
  }

  export interface RetoConseguido {
    ID_RETO: string;
    ID_RETO_CONSEGUIDO: string;
    USER: string;
    PUNTOS: number;
  }

export interface MenuOpts {
    icon: string;
    name: string;
    redirectTo: string;
    rol: string;
}