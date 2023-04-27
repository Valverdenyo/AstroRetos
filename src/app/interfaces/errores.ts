/**
 * Interface para mostrar mensajes de error
 */
export interface Error {

    'email': [
        {
         
          type: 'required',

          message: 'Pon un mail.'
        },
        {
          type: 'pattern',
          message: 'Email no es valido'
        }
      ],
      'password': [
        {
          type: 'required',
          message: 'Pon una contraseña.'
        },
        {
          type: 'minlength',
          message: 'La contraseña debe tener al menos 6 caracteres'
        }
      ]
    }
