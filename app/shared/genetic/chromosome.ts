/**
 * @author Nicolas Polhamus <polhamus.n@outlook.com>
 * @export
 * @class Chromosome
 */
export class Chromosome {
    
    /**
     * @private
     * @type {number}
     * @memberOf Chromosome
     */
    private fitness: number = 0;
    
    /**
     * @private
     * @type {number[]}
     * @memberOf Chromosome
     */
    private dna: number[];
    
    /**
     * Creates an instance of Chromosome.
     * 
     * @param {number[]} dna
     * 
     * @memberOf Chromosome
     */
    constructor(dna: number[]) { 
        this.dna = dna;
    }

    /**
     * @readonly
     * @type {number[]}
     * @memberOf Chromosome
     */
    public get DNA() : number[] {
        return this.dna;
    }  

    /**
     * @type {number}
     * @memberOf Chromosome
     */
    public get Fitness(): number {
        return this.fitness;
    }

    /**
     * @memberOf Chromosome
     */
    public set Fitness(v: number) {
        this.fitness = v;
    }
}