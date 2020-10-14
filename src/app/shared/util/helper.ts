export class Helper {

    /**
     * Returns a cloned version of the object provided
     *
     * @param {any} data The object we are cloning
     *
     * @returns {any}
     */
    public static cloneObject(data: any): any {
        return JSON.parse(JSON.stringify(data));
    }
}
