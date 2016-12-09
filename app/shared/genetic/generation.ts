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
    private g: Chromosome[] = new Array();
    
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

    repopulate(): void {
        let parents: Chromosome[] = new Array();
        let newG: Chromosome[] = new Array();
        let newC: Chromosome;
        let p: number;
        for(let i = 0; newG.length < this.size; i++) {
            p = this.rnd.nextInt32([0,100]);
            parents = this.select();
            if (p > 20) {
                newC = this.crossover(parents[0].DNA, parents[1].DNA);
                newG.push(newC);
            } else {
                newC = this.crossover(parents[0].DNA, parents[1].DNA);
                newC = this.mutate(newC.DNA);
                newG.push(newC);
            }
        }
        this.g = newG;
    }

    getBest(): Chromosome {
        let best: Chromosome;
        this.g.forEach((chromo) => {
            if (typeof best === 'undefined') {
                best = chromo;
            } else {
                if (chromo.Fitness > best.Fitness) {
                    best = chromo;
                }
            }
        });
        return best;
    }

    /**
     * @private
     * @param {number} roomWidth
     * @param {number} roomLength
     * 
     * @memberOf Generation
     */
    private populate(roomWidth: number, roomLength: number) {
        let walkable: number = 10*10;
        for (var i = 0; i < this.size; i++) {
            this.g.push(this.randomChromosome(walkable));
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
        let DNA: number[] = new Array();
        for (let i = 0; i < walkable; i++) {
            DNA.push(this.rnd.nextInt32([0,4]));
        }
        return new Chromosome(DNA);
    }

    private select(): Chromosome[] {
        let parents: Chromosome[] = new Array();
        let S: number = 0;
        let r: number = 0;
        let s: number = 0;
        this.g.forEach((chromo) => {
            S += chromo.Fitness;
        });
        while(parents.length < 2) {
            s = 0;
            r = this.rnd.nextInt32([0,S]);
            for (let i = 0; i < this.g.length; i++) {
                s += this.g[i].Fitness;
                if (s > r) {
                    if (!parents.find((chromo) => { return chromo === this.g[i];})) {
                        parents.push(this.g[i]);
                    }
                    break;
                }
            }
        }
        return parents;
    }

    private crossover(a: number[], b: number[]): Chromosome {
        let cpoint: number = this.rnd.nextInt32([0,a.length]);
        let dna: number[] = a.slice(0,cpoint).concat(b.slice(cpoint,b.length));
        return new Chromosome(dna);
    }

    private mutate(dna: number[]): Chromosome {
        let newDna: number[] = dna;
        let point: number = this.rnd.nextInt32([0,dna.length]);
        newDna[point] = this.rnd.nextInt32([0,4]);
        return new Chromosome(newDna);
    }
    
    /**
     * @type {Chromosome[]}
     * @returns {Chromosome[]} generation
     * 
     * @memberOf Generation
     */
    public get generation() : Chromosome[] {
        return this.g;
    }

    /**
     * @param {Chromosome[]} v 
     * 
     * @memberOf Generation
     */
    public set generation(v : Chromosome[]) {
        this.g = v;
    }
}
