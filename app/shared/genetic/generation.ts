import { Chromosome } from './chromosome';
import { Random } from '../random';

/**
 * @author Nicolas Polhamus <polhamus.n@outlook.com>
 * @export
 * @class Generation
 */
export class Generation {
    
    /** 
     * @private
     * @type {Chromosome[]}
     * @memberOf Generation
     */
    private g: Chromosome[];
    
    /**
     * @private
     * @type {number}
     * @memberOf Generation
     */
    private size: number;
    
    /**
     * @private
     * @type {Random}
     * @memberOf Generation
     */
    private rnd: Random = new Random();

    /**
     * Creates an instance of Generation.
     * 
     * @param {number} s
     * @param {number} w
     * @param {number} l
     * 
     * @memberOf Generation
     */
    constructor(s: number, w: number, l: number) { 
        this.size = s;
        this.populate(w,l);
    }

    /**
     * @private
     * @param {number} roomWidth
     * @param {number} roomLength
     * 
     * @memberOf Generation
     */
    private populate(roomWidth: number, roomLength: number) {
        this.g = Chromosome[this.size];
        let walkable: number = roomWidth*roomLength;
        for (var i = 0; i < this.size; i++) {
            this.g[i] = this.randomChromosome(walkable);
        }      
    }

    /**
     * @private
     * @param {number} walkable
     * @returns {Chromosome}
     * 
     * @memberOf Generation
     */
    private randomChromosome(walkable: number): Chromosome {
        let DNA: number[] = new Array(walkable);
        return new Chromosome(DNA.map((v) => this.rnd.nextInt32([0,4])));
    }
    
    /**
     * @type {Chromosome[]}
     * @memberOf Generation
     */
    public get generation() : Chromosome[] {
        return this.g;
    }

    /**
     * @memberOf Generation
     */
    public set generation(v : Chromosome[]) {
        this.g = v;
    }
}