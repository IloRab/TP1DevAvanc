import {readFile, writeFile} from 'node:fs/promises'
import { v4 as uuidv4 } from 'uuid';
import {getDate, monSecret} from "./divers.js";
import {NotFoundError} from "./errors.js";
import {createHash} from 'node:crypto'


/* Chemin de stockage des blocks */
const path = '../data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */



/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    try {
        const filePath = new URL('../package.json', import.meta.url);
        const contents = await readFile(path, { encoding: 'utf8' });
        console.log(contents);
        return JSON.parse(contents);
    } catch (err) {
        console.error(err.message);
    }
}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {

}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const content = await findBlocks();
    const last = content[content.length-1]
    console.log(last)
    return last

}
/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    //Block b;
    const id = uuidv4();
    const date = getDate()
    const nom = contenu.nom
    const don = contenu.don
    const lastBlock = await findLastBlock();

    const pBlockString = JSON.stringify(lastBlock);
    const pBlockHash = createHash('sha256').update(pBlockString).digest('hex');
    const data_block = {"id":id,"date":date,"nom":nom,"don":don, "hash":pBlockHash}

    const list_block = [... await findBlocks(),  data_block]
    writeFile(path, JSON.stringify(list_block))
    return list_block;

}

