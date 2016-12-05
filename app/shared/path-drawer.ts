import { Map } from './map/map';
import { Tile } from './map/tile';

/**
 * @author Nicolas Polhamus <polhamus.n@outlook.com>
 * @export
 * @class PathDrawer
 */
export class PathDrawer {
    /**
     * @private
     * @type {Map}
     * @memberOf PathDrawer
     */
    private map: Map;
    /**
     * @private
     * @type {{x: number, y: number}}
     * @memberOf PathDrawer
     */
    private startPoint: {x: number, y: number};
    /**
     * Creates an instance of PathDrawer.
     * 
     * @param {Map} m
     * 
     * @memberOf PathDrawer
     */
    constructor(m: Map) {
        this.map = m;
        this.startPoint = this.map.getStartPoint();
    }
    /**
     * @param {string[]} path
     * @returns {string}
     * 
     * @memberOf PathDrawer
     */
    drawPath(path: string[]): string {
        let redrawn: Tile[] = this.map.map;
        let pathCoords: {x: number, y: number}[];
        pathCoords = this.getPathCoords(path);
        pathCoords.forEach((coord) => {
            redrawn[coord.x + this.map.W * coord.y] = Tile.Walked;
        });
        this.map.map = redrawn;
        return this.map.toString();
    }
    /**
     * @private
     * @param {string[]} path
     * @returns {object[]}
     * 
     * @memberOf PathDrawer
     */
    private getPathCoords(path: string[]): {x: number, y: number}[] {
        return path.map((step) => {
            switch (step) {
                case 'U':
                    this.startPoint.y -= 1;
                    return {'x': this.startPoint.x, 'y': this.startPoint.y};         
                case 'R':
                    this.startPoint.x += 1;
                    return {'x': this.startPoint.x, 'y': this.startPoint.y};
                case 'D':
                    this.startPoint.y += 1;
                    return {'x': this.startPoint.x, 'y': this.startPoint.y};
                case 'L':
                    this.startPoint.x -= 1;
                    return {'x': this.startPoint.x, 'y': this.startPoint.y};
            }
        });
    }
}
