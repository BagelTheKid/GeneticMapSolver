import { Tile } from './map/tile';
import { Map } from './map/map';  //<-- Necessary?


/**
 * @author Nicolas Polhamus <polhamus.n@outlook.com>
 * @export
 * @class PathAnalyzer
 */
export class PathAnalyzer {
    /**
     * @private
     * @type {Map}
     * @memberOf PathAnalyzer
     */
    private map: Map;

    /**
     * @private
     * @type {object}
     * @memberOf PathAnalyzer
     */
    private currentPoint: {x: number,y: number};
    
    /**
     * Creates an instance of PathAnalyzer.
     * 
     * @param {Map} m
     * 
     * @memberOf PathAnalyzer
     */
    constructor(m: Map) {
        this.map = m;
        this.currentPoint = this.map.getStartPoint();
    }
    
    /**
     * @function 
     * @param {string[]} path
     * @returns {number}
     * 
     * @memberOf PathAnalyzer
     */
    analyze(path: string[]): number {
        for (let i = 0; i < path.length; i++) {
            if (this.validTile(path[i])){
                this.takeStep(path[i]);
            } else {
                break;
            }
        }
        return this.map.measureDistanceToEnd(this.currentPoint);
    }
    
    /**
     * @function
     * @private
     * @param {string} step
     * @returns {boolean}
     * 
     * @memberOf PathAnalyzer
     */
    private validTile(step: string): boolean {
        let tileWalkedInto: Tile;
        switch (step) {
            case 'U':
                tileWalkedInto = this.map.getTile(this.currentPoint.x, this.currentPoint.y-1);
                break;
            case 'R':
                tileWalkedInto = this.map.getTile(this.currentPoint.x+1, this.currentPoint.y);
                break;
            case 'D':
                tileWalkedInto = this.map.getTile(this.currentPoint.x, this.currentPoint.y+1);
                break;
            case 'L':
                tileWalkedInto = this.map.getTile(this.currentPoint.x-1, this.currentPoint.y);
                break;
        }
        switch (tileWalkedInto) {
            case Tile.DirtFloor:
            case Tile.MetalFloor:
            case Tile.MetalDoor:
            case Tile.StoneFloor:
            case Tile.StoneDoor:
            case Tile.WoodFloor:
            case Tile.WoodDoor:
                return true;
            default:
                return false;
        }
    }
    
    /**
     * @function 
     * @private
     * @param {string} step
     * 
     * @memberOf PathAnalyzer
     */
    private takeStep(step: string) {
        switch (step) {
            case 'U':
                this.currentPoint.y -= 1;
                break;
            case 'R':
                this.currentPoint.x += 1;
                break;
            case 'D':
                this.currentPoint.y += 1;
                break;
            case 'L':
                this.currentPoint.x -= 1;
                break;
        }
    }
}
