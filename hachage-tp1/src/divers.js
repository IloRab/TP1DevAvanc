/**
 * @description Definie la variable pour le hash du premier bloc
 * @type {string}
 */
export const monSecret = "";

/**
 * @description Retourne un timestamp au format aaaammjj-hh:mm:ss
 * @return {string}
 */
export function getDate() {
    const date = new Date()
    const timestamp = date.toLocaleDateString("fr-CA")

    return timestamp
}

//console.log(getDate())