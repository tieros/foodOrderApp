export const errorMessage = (error) =>{

   const msg = 'Error: ' + 
        error.slice(22, -2).replace('-', ' ')
        .split(' ').map(word => word.charAt(0)
        .toUpperCase() + word.slice(1))
        .join(' ');

   return msg;
}